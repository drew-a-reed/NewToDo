declare var google: any;
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
  eyeIcon: string = 'fa-eye-slash';
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

    // google.accounts.id.initialize({
    //   client_id:
    //     '257479571203-af1404qragk94fe2fpnj60s3616t7k8c.apps.googleusercontent.com',
    //   callback: (response: any) => {
    //     this.handleLogin(response);
    //   },
    // });

    // google.accounts.id.renderButton(document.getElementById('google-btn'), {
    //   theme: 'filled_blue',
    //   size: 'large',
    //   shape: 'rectangle',
    //   width: 350,
    // });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
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
        error: (response) => {
          console.log('Error response:', response);
          if (response.error?.Message === 'Email Already Exists') {
            this.error = 'This email is already registered. Please use a different email.';
          } else {
            this.error = response.error?.Message || 'Signup failed. Please try again.';
          }
          this.showModal = true;
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

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      var email = payload.email;
      var firstName = payload.given_name;
      var lastName = payload.family_name;
      var password = payload.aud + '@S';

      this.signupForm = this.formBuilder.group({
        firstName: [firstName, Validators.required],
        lastName: [lastName, Validators.required],
        email: [email, Validators.required],
        password: [password, Validators.required],
      });

      this.onSignup();
    }
  }
}
