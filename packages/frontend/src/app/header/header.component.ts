import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Page header.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor() {}

  /**
   * Url used for authentication using Google OAuth.
   */
  public loginUrl = `${environment.apiBaseUrl}/auth/google`;
}
