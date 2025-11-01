import { CookieService } from 'ngx-cookie-service';
import { Component, inject } from '@angular/core';
import { OrderService } from '../../core/service/orders/order-service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css'
})
export class AllOrders {
  private ordersService = inject(OrderService);
  constructor(private _CookieService: CookieService) { }
  orders: any[] = [];
  isLoading = false;
  errorMessage = '';
  userIdFromToken!: string;
  checkedId!: string;
  ngOnInit() {
    this.loadOrders();
    const token = this._CookieService.get('token')!;
    const decoded: any = jwtDecode(token);
    this.userIdFromToken = decoded.id;
    console.log("ddd", this.userIdFromToken)
  }

  loadOrders() {
    this.isLoading = true;
    this.ordersService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to load orders';
        this.isLoading = false;
      }
    });
  }
}
