import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  forgotPassword!: FormGroup;

  constructor(
    private resetService: ResetPasswordService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgotPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern =
      /^[a-zA-Z0-9\.\-_]+@([a-zA-Z0-9\-_]+\.)+[a-zA-Z0-9\-_]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;

  }

  confirmToSend() {
    if (this.forgotPassword.valid) {
      this.resetPasswordEmail = this.forgotPassword.get('email')?.value;
      this.resetService
        .sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (response) => {
            console.log(response);

            this.forgotPassword.reset();
            alert("Reset email sent");
            this.router.navigate(['login']);
          },
          error: (err) => {
            console.log(err,);

            alert('Reset Failed');
          },
        });
    } else {
      alert('Invalid email address');
    }
  }
}
