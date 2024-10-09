import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'visibility_off';
  loginForm!: FormGroup;
  showModal: boolean = false;
  display: string = 'flex';
  passwordState: string = 'Show';
  error: string = 'Login failed. Please check your credentials.';
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['duser@email.com', Validators.required],
      password: ['ThisIsThePassword123!', Validators.required],
    });
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'visibility') : (this.eyeIcon = 'visibility_off');
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.passwordState = 'Hide') : (this.passwordState = 'Show');
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loginForm.reset();
          this.auth.storeToken(response.accessToken);
          this.auth.storeRefreshToken(response.refreshToken);
          this.auth.storeUserId(response.userId);
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);

          this.router.navigate(['taskboard-picker']);

        },
        error: (response) => {
          alert('Email/password do not match.');
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      this.showModal = true;
    }
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern =
      /^[a-zA-Z0-9\.\-_]+@([a-zA-Z0-9\-_]+\.)+[a-zA-Z0-9\-_]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.resetService
        .sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (response) => {
            this.resetPasswordEmail = '';
            const buttonRef = document.getElementById('closeBtn');
            buttonRef?.click();
          },
          error: (err) => {
            alert('Reset Failed');
          },
        });
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);

      var email = payload.email;
      var password = payload.aud + '@S';

      this.loginForm = this.formBuilder.group({
        email: [email, Validators.required],
        password: [password, Validators.required],
      });

      this.onLogin();
    }
  }

  hideWarning(){
    this.display = 'none';
  }

}
