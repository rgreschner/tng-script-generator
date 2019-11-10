import { Controller, UseGuards, Get, Post, Body, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScriptGeneratorService } from './script-generator.service';
import { ScriptRepository } from './script.repository';

/**
 * Controller for script generation.
 */
@Controller('script-generator')
export class ScriptGeneratorController {
  constructor(
    private readonly scriptGenerator: ScriptGeneratorService,
    private readonly scriptRepository: ScriptRepository,
  ) {}

  /**
   * Generate new script.
   * @param payload Payload from frontend containing payment information.
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async generateNewScript(@Req() req, @Body() payload: any) {
    const stripePaymentId = payload.payment.stripe.id;
    // PROD: In production, you would perform some sort of
    // processing like validation / persistence in DB
    // using this payment token.
    const userId = req.user.sub;
    return await this.scriptGenerator.generateNewScript(stripePaymentId, userId);
  }

  /**
   * Get recently generated script.
   */
  @Get('recent')
  @UseGuards(AuthGuard('jwt'))
  public async getRecentlyGenerated(@Req() req) {
    const userId = req.user.sub;
    return await this.scriptGenerator.getRecentlyGeneratedByUserId(userId);
  }

  /**
   * Find generated scripts by me.
   */
  @Get('script/by-me')
  @UseGuards(AuthGuard('jwt'))
  public async findScriptsByMe(@Req() req) {
    const userId = req.user.sub;
    return await this.scriptRepository.findAllByUserId(userId);
  }

  /**
   * Get generated script by id.
   */
  @Get('script/:id')
  @UseGuards(AuthGuard('jwt'))
  public async getScriptById(@Param('id') id: string) {
    return await this.scriptRepository.findOneById(id);
  }
}
