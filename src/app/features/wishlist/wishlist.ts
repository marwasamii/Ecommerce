import { ToastrService } from 'ngx-toastr';
import { Card } from '../../shared/component/card/card';
import { WishListService } from './../../core/service/wishlist/wish-list-service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  imports: [Card],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist implements OnInit {
  constructor(private _WishListService: WishListService) { }
  private toastr = inject(ToastrService);
  cardId!: string;

  
  get dataList() {
    return this._WishListService.dataList;
  }
  
  ngOnInit(): void {
    this._WishListService.getData()
  }

}
