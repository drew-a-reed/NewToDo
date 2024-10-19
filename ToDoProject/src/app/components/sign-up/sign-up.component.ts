import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: '../sign-up/sign-up.component.html',
  styleUrls: ['../sign-up/sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'visibility_off';
  signupForm!: FormGroup;
  showModal: boolean = false;
  error: string = 'Login failed. Please check your credentials.';
  passwordState: string = 'Show';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'visibility') : (this.eyeIcon = 'visibility_off');
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.passwordState = 'Hide') : (this.passwordState = 'Show');
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (response) => {
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (errorResponse) => {
          console.log('Error response:', errorResponse);

          if (errorResponse.status === 403) {
            const errorMessage = errorResponse.error?.Message || 'Email already exists';
            alert(errorMessage);
          } else {
            alert('An unexpected error occurred. Please try again.');
          }
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.signupForm);
      this.showModal = true;
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // handleLogin(response: any) {
  //   if (response) {
  //     const payload = this.decodeToken(response.credential);
  //     var email = payload.email;
  //     var firstName = payload.given_name;
  //     var lastName = payload.family_name;
  //     var password = payload.aud + '@S';

  //     this.signupForm = this.formBuilder.group({
  //       firstName: [firstName, Validators.required],
  //       lastName: [lastName, Validators.required],
  //       email: [email, Validators.required],
  //       password: [password, Validators.required],
  //     });

  //     this.onSignup();
  //   }
  // }
}
