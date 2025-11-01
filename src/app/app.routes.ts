import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/login/login';
import { SignUp } from './features/sign-up/sign-up';
import { Products } from './features/products/products';
import { ProductDetails } from './features/product-details/product-details';
import { Categories } from './features/categories/categories';
import { Brands } from './features/brands/brands';
import { Cart } from './features/cart/cart';
import { Notfound } from './features/notfound/notfound';
import { authGuard } from './core/guard/auth-guard';
import { loggedInGuard } from './core/guard/logged-in-guard';
import { ForgetPasswordComponent } from './features/forget-password-component/forget-password-component';
import { Checkout } from './features/checkout/checkout';
import { AllOrders } from './features/all-orders/all-orders';
import { BrandDetails } from './features/brand-details/brand-details';
import { CategoryDetails } from './features/category-details/category-details';
import { Wishlist } from './features/wishlist/wishlist';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "home", component: Home },
    { path: "login", component: Login, canActivate:[loggedInGuard] },
    { path: "signup", component: SignUp, canActivate:[loggedInGuard] },
    { path: "resetPassword", component: ForgetPasswordComponent, canActivate:[loggedInGuard] },
    { path: "products", component: Products },
    { path: "productDetails/:id", component: ProductDetails, data: { prerender: false } },
    { path: "categories", component: Categories },
    { path: "categoriesDetails/:id", component: CategoryDetails, data: { prerender: false } },
    { path: "brands", component: Brands },
    { path: "brandsDetails/:id", component: BrandDetails, data: { prerender: false } },
    { path: "cart", component: Cart, canActivate:[authGuard] },
    { path: "wishlist", component: Wishlist, canActivate:[authGuard] },
    { path: "checkOut/:id", component: Checkout, canActivate:[authGuard], data: { prerender: false } },
    { path: "allorders", component: AllOrders, canActivate:[authGuard] },
    { path: "**", component: Notfound },
];

