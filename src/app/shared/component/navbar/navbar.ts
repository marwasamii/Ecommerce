import { MyTranslate } from './../../../core/service/myTranslate/my-translate';
import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/service/flowbite/flowbite-service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../core/service/auth/login/login-service';
import { CartService } from '../../../core/service/cart/cart-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  cartNumber:number= 0;
  constructor(private flowbiteService: FlowbiteService,private cart:CartService , private loginService: LoginService, public _MyTranslate:MyTranslate) { }
  isLogged: boolean = false;
  ngOnInit(): void {

    this.loginService.userData.subscribe({
      next:(res)=>{
        if(res !== null){
          this.isLogged = true;
        }else{
          this.isLogged = false;
        }
      }
    })


    this.cart.cartNumber.subscribe({
      next:(res)=>{
        console.log(res)
        this.cartNumber = res
      }
    })

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(){
    this.loginService.logOut();
  }
}
