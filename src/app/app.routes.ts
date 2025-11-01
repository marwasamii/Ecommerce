// routes.ts
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

// ----------------------------
// Prerendering parameter functions
// ----------------------------
export async function getProductPrerenderParams() {
    const res = await fetch('https://your-api-url.com/products');
    const products = await res.json();
    return products.map((p: any) => ({ id: p.id }));
}

export async function getCategoryPrerenderParams() {
    const res = await fetch('https://your-api-url.com/categories');
    const categories = await res.json();
    return categories.map((c: any) => ({ id: c.id }));
}

export async function getBrandPrerenderParams() {
    const res = await fetch('https://your-api-url.com/brands');
    const brands = await res.json();
    return brands.map((b: any) => ({ id: b.id }));
}

// ----------------------------
// Routes
// ----------------------------
export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "home", component: Home },
    { path: "login", component: Login, canActivate: [loggedInGuard] },
    { path: "signup", component: SignUp, canActivate: [loggedInGuard] },
    { path: "resetPassword", component: ForgetPasswordComponent, canActivate: [loggedInGuard] },
    { path: "products", component: Products },

    // Dynamic routes with prerendering
    { path: "productDetails/:id", component: ProductDetails, data: { prerender: false } },
    { path: "categoriesDetails/:id", component: CategoryDetails, data: { prerender: false } },
    { path: "brandsDetails/:id", component: BrandDetails, data: { prerender: false } },
    { path: "checkOut/:id", component: Checkout, canActivate: [authGuard], data: { prerender: false } },

    // Other routes
    { path: "categories", component: Categories },
    { path: "brands", component: Brands },
    { path: "cart", component: Cart, canActivate: [authGuard], data: { prerender: false } },
    { path: "wishlist", component: Wishlist, canActivate: [authGuard] },
    { path: "checkOut/:id", component: Checkout, canActivate: [authGuard], data: { prerender: false } },
    { path: "allorders", component: AllOrders, canActivate: [authGuard] },
    { path: "**", component: Notfound },
];
