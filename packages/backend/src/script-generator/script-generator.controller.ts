import { Controller, UseGuards, Get, Post, Body, Param } from '@nestjs/common';
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
  public async generateNewScript(@Body() payload: any) {
    const stripePaymentId = payload.payment.stripe.id;
    // PROD: In production, you would perform some sort of
    // processing like validation / persistence in DB
    // using this payment token.
    console.log('stripePaymentId:', stripePaymentId);
    return await this.scriptGenerator.generateNewScript(stripePaymentId);
  }

  /**
   * Get recently generated script.
   */
  @Get('recent')
  @UseGuards(AuthGuard('jwt'))
  public async getRecentlyGenerated() {
    return await this.scriptGenerator.getRecentlyGenerated();
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
