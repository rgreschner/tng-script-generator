import { Component, ViewChild } from '@angular/core';
import {
  StripeService,
  StripeCardComponent,
  ElementOptions,
  ElementsOptions
} from 'ngx-stripe';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';

/**
 * Checkout form for Script Generator using
 * Stripe.
 */
@Component({
  selector: 'app-checkout-with-stripe',
  templateUrl: './checkout-with-stripe.component.html',
  styleUrls: ['./checkout-with-stripe.component.scss']
})
export class CheckoutWithStripeComponent {
  @ViewChild(StripeCardComponent, { static: true })
  private card: StripeCardComponent;

  constructor(
    public activeModal: NgbActiveModal,
    private stripeService: StripeService
  ) {}

  /**
   * Display options of Stripe Card Element.
   */
  public cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  /**
   * Options of Stripe Checkout Element.
   */
  public elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  /**
   * Perform transaction of buying a
   * script generation request.
   */
  public async buy() {
    const result = await this.stripeService
      .createToken(this.card.getCard(), {})
      .pipe(take(1))
      .toPromise();
    this.activeModal.close(result);
  }
}
