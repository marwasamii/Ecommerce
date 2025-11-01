import { Component, Inject, inject } from '@angular/core';
import { ForgetPasswordService } from '../../core/service/forgetPassword/forget-password-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password-component',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password-component.html',
  styleUrl: './forget-password-component.css'
})
export class ForgetPasswordComponent {

  private _ForgetPasswordService = inject(ForgetPasswordService);
  private router = inject(Router);
  isloading: boolean = false;
  errMessage: string = '';
  step: number = 1;

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  submitForgetForm() {
    this.isloading = true;
    this._ForgetPasswordService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next: (res) => {

        this.isloading = false;
        if (res.statusMsg == 'success') {
          this.step = 2;
        }
      }, error: (err) => {
        this.errMessage = err.error.message;

        this.isloading = false;
      }
    })
  }

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

  submitCode() {
    this.isloading = true;
    this._ForgetPasswordService.resetCode(this.resetCodeForm.value).subscribe({
      next: (res) => {
        this.isloading = false;
        if (res.status == 'Success') {
          this.step = 3;
        }
      }, error: (err) => {
        this.errMessage = err.error.message;
        this.isloading = false;
      }
    })
  }

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })

  submitNewPassword() {
    this.isloading = true;
    this._ForgetPasswordService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        this.isloading = false;
        if (res.token) {
          this.router.navigate(['/login'])
        }
      }, error: (err) => {
        this.errMessage = err.error.message;
        this.isloading = false;
      }
    })
  }
}
