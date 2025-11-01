import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/service/auth/login/login-service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private _loginService = inject(LoginService)
  private router = inject(Router);
  private cokiesSevies = inject(CookieService)
  showPassword: boolean = false;

  isLoading: boolean = false;
  errMessage: string = '';
  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  })



  submitForm() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this._loginService.loginData(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message == 'success') {
            //Save token in localStorage
            // localStorage.setItem('token', res.token)
            this.cokiesSevies.set('token', res.token)
            //user data from token
            this._loginService.decodedUserData();
            //login 
            this.router.navigate(['/home'])
            this.isLoading = false;

          }
        }, error: (err) => {
          this.errMessage = err.error.message;
          this.isLoading = false;

        }
      })

    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
