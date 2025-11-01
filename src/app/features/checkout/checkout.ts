// import { Component, inject, OnInit } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CheckOutService } from '../../core/service/checkout/check-out-service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-checkout',
//   imports: [ReactiveFormsModule],
//   templateUrl: './checkout.html',
//   styleUrl: './checkout.css'
// })
// export class Checkout implements OnInit {
//   private _checkOutService = inject(CheckOutService)
//   private router = inject(Router);
//   private cokiesSevies = inject(CookieService)
//   private route = inject(ActivatedRoute)
//   isLoading: boolean = false;
//   errMessage: string = '';
//   cartId!: string | null;

//   checkOutForm = new FormGroup({

//     details: new FormControl('', [Validators.required]),
//     phone: new FormControl('', [Validators.required]),
//     city: new FormControl('', [Validators.required]),

//   })


//   getId() {
//     this.route.paramMap.subscribe({
//       next: (res) => {
//         this.cartId = res.get('id')
//       }
//     })
//   }
//   ngOnInit() {
//     this.getId()
//   }

//   submitForm() {
//     this.isLoading = true;
//     if (this.checkOutForm.valid) {
//       console.log(this.checkOutForm.value)
//       this._checkOutService.checkOutSession(this.checkOutForm.value, this.cartId).subscribe({
//         next: (res) => {
//           console.log(res)
//           if (res.status == 'success') {
//             window.location.href = res.session.url;
//             this.isLoading = false;

//           }
//         }, error: (err) => {
//           this.errMessage = err.error.message;
//           this.isLoading = false;

//         }
//       })

//     } else {
//       this.checkOutForm.markAllAsTouched()
//     }
//   }
// }
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckOutService } from '../../core/service/checkout/check-out-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  private _checkOutService = inject(CheckOutService);
  private router = inject(Router);
  private cookiesService = inject(CookieService);
  private route = inject(ActivatedRoute);

  isLoading = false;
  errMessage = '';
  cartId!: string | null;
  paymentType: 'visa' | 'cash' | '' = '';

  checkOutForm = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.getId();
  }

  getId() {
    this.route.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id');
      },
    });
  }

 submitForm(type: 'visa' | 'cash') {
  this.paymentType = type;

  if (this.checkOutForm.invalid) {
    this.checkOutForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;

  if (type === 'visa') {
    this._checkOutService
      .checkOutSession(this.checkOutForm.value, this.cartId)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.location.href = res.session.url;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errMessage = err.error.message;
          this.isLoading = false;
        },
      });
  } else {
    this._checkOutService
      .payCash(this.checkOutForm.value, this.cartId!)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.router.navigate(['/allorders']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errMessage = err.error.message;
          this.isLoading = false;
        },
      });
  }
}

}

