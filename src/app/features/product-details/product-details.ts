import { WishListService } from './../../core/service/wishlist/wish-list-service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/service/products/product-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/service/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  constructor(private _productService: ProductService) { }
  private wishList = inject(WishListService);

  private activated = inject(ActivatedRoute);
  dataDetails: any;
  id!: string | null;
  getProductId() {
    this.activated.paramMap.subscribe({
      next: (paramUrl) => {
        this.id = paramUrl.get('id')
        console.log(this.id)

      }
    })
  }
  ngOnInit(): void {
    this.getProductId();
    this.getData();
  }

  getData() {
    this._productService.getProductDetails(this.id).subscribe({
      next: (res) => {
        this.dataDetails = res.data;
        console.log(this.dataDetails)

      }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      }
    },
    nav: true
  }

  private cart = inject(CartService);
  private toastr = inject(ToastrService);

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
