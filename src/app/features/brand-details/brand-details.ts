import { BrandService } from './../../core/service/brands/brand-service';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-details',
  imports: [],
  templateUrl: './brand-details.html',
  styleUrl: './brand-details.css'
})
export class BrandDetails implements OnInit {

  private activated = inject(ActivatedRoute);
  constructor(private _BrandService: BrandService) { }
  Id!: string | null;
  specificBrand: any;
  getBrandId() {
    this.activated.paramMap.subscribe({
      next: (paramUrl) => {
        this.Id = paramUrl.get('id');
        console.log(this.Id)

      }
    })
  }

  getBrandDetailsData() {
    this._BrandService.getSpecificBrand(this.Id).subscribe({
      next: (res) => {
        console.log(res)
        this.specificBrand = res.data
        console.log(this.specificBrand)
      }, error(err) {
        console.log(err)
      },
    })
  }


  ngOnInit(): void {
    this.getBrandId();
    this.getBrandDetailsData();
  }

}
