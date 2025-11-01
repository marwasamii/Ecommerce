import { BrandService } from './../../core/service/brands/brand-service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands implements OnInit {

  constructor(private _BrandService: BrandService) { }
  brandsList: WritableSignal<any[]> = signal([]);
  getAllBrands() {
    this._BrandService.getBrands().subscribe({
      next: (res) => {
        this.brandsList.set(res.data)
        console.log('Brands', res.data)
      }, error(err) {
        console.log(err)
      },
    })
  }
  ngOnInit(): void {
    this.getAllBrands();
  }
  

}
