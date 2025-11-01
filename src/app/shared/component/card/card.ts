import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnSalePipe } from '../../pipe/on-sale-pipe';
import { CartService } from '../../../core/service/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/service/wishlist/wish-list-service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, UpperCasePipe, CurrencyPipe, OnSalePipe],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  date = new Date();
  @Input() productData: any;
  private cart = inject(CartService);
  private toastr = inject(ToastrService);
  private wishList = inject(WishListService);

  addProduct(id: string) {
    this.cart.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'success')
        this.cart.cartNumber.next(res.numOfCartItems)
        console.log(res)
      }, error: (err) => {
        this.toastr.error(err.error.message, 'Error')
        console.log(err)
      }
    })
  }
  addToWishlist(id: string) {
    this.wishList.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log('wishlist card', res)
        this.toastr.success(res.message, 'success')
        const current = this.wishList.dataList();
        this.wishList.dataList.set([...current, { _id: id }]);
      }, error: (err) => {
        console.log("err",err)
      }
    })
  }
  isInWishlist(productId: string): boolean {
    return this.wishList.dataList().some((item: any) => item._id === productId);
  }


  removeData(id: string) {
    this.wishList.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this.toastr.success('Removed...')
        const current = this.wishList.dataList();
        this.wishList.dataList.set(current.filter((item: any) => item._id !== id));
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  toggleWishlist(productId: string, event: Event) {
    event.stopPropagation();
    if (!productId) return;

    if (this.isInWishlist(productId)) {
      this.removeData(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

}
