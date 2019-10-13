import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Modal dialog showing not authenticated
 * message.
 */
@Component({
  selector: 'app-not-authenticated-alert',
  templateUrl: './not-authenticated-alert.component.html'
})
export class NotAuthenticatedAlertComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
