import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotAuthenticatedAlertComponent } from '../not-authenticated-alert/not-authenticated-alert.component';
import { CheckoutWithStripeComponent } from '../checkout-with-stripe/checkout-with-stripe.component';
import { ToastrService } from 'ngx-toastr';
import { ScriptGeneratorService } from '../script-generator.service';
import { delay } from '../delay.util';
import { environment } from '../../environments/environment';

/**
 * Component for generation and
 * display of generated scripts.
 */
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent {

  constructor(
    private scriptGeneratorService: ScriptGeneratorService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  /**
   * Is generation button disabled?
   */
  public isDisabled = false;
  /**
   * Is currently generating?
   */
  public isGenerating = false;

  /**
   * Show stripe error.
   * @param error Error object coming from Stripe.
   */
  private showStripeError(error) {
    this.toastr.error(error.message, `Stripe Error: ${error.code}`);
    console.error(error);
  }

  /**
   * Load recently generated script for display.
   */
  public async loadRecentlyGenerated() {
    // Check authentication state first before trying to
    // checkout with Stripe.
    const isAuthenticated = await this.scriptGeneratorService.checkAuthenticated();
    if (!isAuthenticated) {
      // Show warning & abort if not authenticated.
      await this.modalService.open(NotAuthenticatedAlertComponent).result;
      return;
    }
    const generationResult: any = await this.scriptGeneratorService.getRecentlyGenerated();
    this.generationResult = generationResult;
  }

  /**
   * Perform new script generation.
   */
  public async generate() {
    this.isDisabled = true;
    // Check authentication state first before trying to
    // checkout with Stripe.
    const isAuthenticated = await this.scriptGeneratorService.checkAuthenticated();
    if (!isAuthenticated) {
      // Show warning & abort if not authenticated.
      await this.modalService.open(NotAuthenticatedAlertComponent).result;
      this.isDisabled = false;
      return;
    }
    // Show checkout with Stripe dialog.
    const dialogRef = this.modalService.open(CheckoutWithStripeComponent);
    try {
      const stripePaymentResult = await dialogRef.result;
      console.log(stripePaymentResult);
      if (!!stripePaymentResult.error) {
        this.isDisabled = false;
        this.showStripeError(stripePaymentResult.error);
        return;
      }
      // Successfully checked out with Stripe => call backend.
      console.log('Got token.', stripePaymentResult.token);
      this.generationResult = null;
      this.isGenerating = true;
      const result: any = await this.scriptGeneratorService.generateNewScript(
        stripePaymentResult
      );
      console.log(result);
      const scriptId = result._id;
      await delay(environment.scriptGeneratorWaitTime);
      // Finished generation.
      this.isGenerating = false;
      this.toastr.success(
        'Script generation was finished successfully.',
        'Script Generation Complete'
      );
      const generationResult: any = await this.scriptGeneratorService.getScriptById(
        scriptId
      );
      this.generationResult = generationResult;
      this.isDisabled = false;
    } catch (err) {
      // Pretty generic error handling.
      this.toastr.error(err.message, 'Generic Error');
      console.error(err);
      this.isDisabled = false;
      this.isGenerating = false;
    }
  }

  /**
   * Generated script.
   */
  public generationResult: any;
}
