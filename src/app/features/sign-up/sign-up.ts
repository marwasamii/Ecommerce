import { SignupService } from './../../core/service/auth/signup/signup-service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  private registerService = inject(SignupService)
  private router = inject(Router);
  isLoading: boolean = false;
  errMessage: string = '';
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, { validators: this.confirmPassword })

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value;
    let confirmedPassword = group.get('rePassword')?.value;
    if (password === confirmedPassword) {
      return null;
    } else {
      return { missMatch: true }
    }
  }

  submitForm() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this.registerService.registerData(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message == 'success') {
            this.router.navigate(['/login'])
            this.isLoading = false;

          }
        }, error: (err) => {
          this.errMessage = err.error.message;
          this.isLoading = false;

        }
      })

    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
