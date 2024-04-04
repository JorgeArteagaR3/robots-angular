import { Component } from '@angular/core';
import { UserCredentials } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInError = false;
  credentials: UserCredentials = { email: '', password: '' };
  constructor(private userSvc: UserService, private router: Router) {}
  signIn() {
    this.userSvc.signIn(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.signInError = true;
        setTimeout(() => {
          this.signInError = false;
        }, 5000);
      },
    });
  }
}
