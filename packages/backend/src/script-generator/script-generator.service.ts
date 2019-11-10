import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';
import { ScriptRepository } from './script.repository';
import { ConfigService } from '../config/config.service';
import { DISCLAIMER } from './disclaimer.const';

/**
 * Promisify shell.exec for async.
 * @param args
 */
const execAsync = (...args) =>
  new Promise(resolve =>
    shell.exec(...args, (code, stdout, stderr) =>
      resolve({
        code,
        stdout,
        stderr,
      }),
    ),
  );

/**
 * Service providing script generation
 * functionality.
 */
@Injectable()
export class ScriptGeneratorService {

  constructor(
    private readonly scriptRepository: ScriptRepository,
    private configService: ConfigService,
  ) {}

  /**
   * Get working directory of script generator.
   */
  private getScriptGenWorkingDirectory() {
    const scriptGenWorkingDirectory = this.configService
      .get('SCRIPTGEN_WORKING_DIRECTORY')
      .replace(new RegExp('{{cwd}}', 'g'), process.cwd());
    return scriptGenWorkingDirectory;
  }

  /**
   * Clean generated script from generator
   * text output.
   * @param allOutput Complete output of generator script.
   */
  private cleanGeneratedScript(allOutput: string) {
    const headerLine = '-----BEGIN GENERATED TEXT-----';
    const footerLine = '-----END GENERATED TEXT-----';
    const startOfTextPos = allOutput.indexOf(headerLine) + headerLine.length;
    const endOfTextPos = allOutput.indexOf(footerLine);
    const scriptText = allOutput.slice(startOfTextPos, endOfTextPos).trim();
    return scriptText;
  }

  /**
   * Start generation of new script.
   */
  public async generateNewScript(stripeId: string, userId: string) {

    // PROD: For production quality, this
    // method should put the generation request into a
    // proper job queue for scalability.
    const startTime = new Date().getTime();
    const uuidv4 = require('uuid/v4');
    const id = uuidv4();
    console.log(`Generating script with id '${id}', stripe id '${stripeId}'.`);
    const generationStartResult = {
      _id: id,
      userId,
      status: 'started',
      startTime,
    };
    await this.scriptRepository.save(generationStartResult);
    // Asynchronously start script generation
    // in the background.
    setImmediate(async () => {
      await this.generateNewScriptTask(id, userId, startTime);
    });
    // Return reference on started
    // script generation job with id.
    return generationStartResult;
  }

  /**
   * Generate new script using Python
   * generator script in background.
   */
  private async generateNewScriptTask(id: string, userId: string, startTime: number) {
    // Navigate to script generator working directory
    // and go Python on it.
    shell.cd(this.getScriptGenWorkingDirectory());
    const pythonInterpreter = this.configService.get('PYTHON_INTERPRETER');
    const generatorScriptName = 'scriptgen.py';
    // Start generation script.
    const execResult: any = await execAsync(
      `${pythonInterpreter} ${generatorScriptName}`,
      { silent: true },
    );
    const endTime = new Date().getTime();
    const generationTime = endTime - startTime;
    const hasErrorStatusCode = execResult.code !== 0;
    const status = !hasErrorStatusCode ? 'completed' : 'failed';
    console.log(
      `Generated script with id '${id}', status code ${execResult.code} in ${generationTime}ms.`,
    );
    let generationResult: any = {
      _id: id,
      userId,
      status,
      startTime,
      endTime,
      generationTime,
    };
    const allOutput = execResult.stdout as string;
    if (!hasErrorStatusCode) {
      const scriptText = [
        DISCLAIMER,
        this.cleanGeneratedScript(allOutput),
      ].join('\n\n');
      generationResult = {
        ...generationResult,
        scriptText,
      };
    } else {
      generationResult = {
        ...generationResult,
        error: { message: execResult.stderr },
      };
    }
    await this.scriptRepository.save(generationResult);
  }

  /**
   * Get recently generated script by user id.
   */
  public async getRecentlyGeneratedByUserId(userId: string) {
    return this.scriptRepository.findOneRecentByUserId(userId);
  }
}
