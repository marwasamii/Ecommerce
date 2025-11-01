import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../core/service/products/product-service';
import { Card } from "../../shared/component/card/card";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipe/search/search-pipe';

@Component({
  selector: 'app-products',
  imports: [Card,FormsModule,SearchPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {


  constructor(private _productService: ProductService) { }

  dataList: WritableSignal<any[]> = signal([])
  inputText: string = '';

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res)
        this.dataList.set(res.data)
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
