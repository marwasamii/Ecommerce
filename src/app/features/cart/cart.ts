import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/service/cart/cart-service';
import { Icartproduct } from '../../core/interface/cart/icartproduct';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  cardId!: string;
  productList: Icartproduct[] = [];
  totalPrice: number = 0;
  private cart = inject(CartService);
  private toastr = inject(ToastrService);
  getCart() {
    this.cart.getCartProducts().subscribe({
      next: (res) => {
        this.cardId = res.data._id;
        this.productList = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.cart.cartNumber.next(res.numOfCartItems)
      }, error: (err) => {
        console.log('err', err)
      }
    })
  }
  ngOnInit(): void {
    this.getCart();
  }

  removeItem(id: string) {
    this.cart.deleteProductCart(id).subscribe({
      next: (res) => {
        this.toastr.success('Product Deleted...')
        this.getCart();
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  updateItem(count: number, id: string) {
    this.cart.updateProductCart(count, id).subscribe({
      next: (res) => {
        // this.toastr.success('Product Updated Sucessfully...')
        this.getCart();
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  clearCart() {
    this.cart.clarCart().subscribe({
      next: (res) => {
        this.getCart();
      }
    })
  }
}
