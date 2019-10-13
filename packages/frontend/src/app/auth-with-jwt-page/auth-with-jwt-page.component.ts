import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from '../delay.util';

/**
 * Page showing authentication message after redirect
 * containing JWT from server.
 */
@Component({
  selector: 'app-auth-with-jwt-page',
  templateUrl: './auth-with-jwt-page.component.html'
})
export class AuthWithJwtPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public isAuthenticated = false;

  async ngOnInit() {
    const jwt: string = this.route.snapshot.paramMap.get('jwt');
    this.isAuthenticated = jwt !== 'failed';
    if (this.isAuthenticated) {
      // Save reference on JWT.
      localStorage.setItem('id_token', jwt);
      // Navigate to home after delay.
      await delay(5000);
      this.router.navigate(['/']);
    }
  }
}
