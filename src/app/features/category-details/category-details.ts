import { CategoriesService } from './../../core/service/catrgories/categories-service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.html',
  styleUrl: './category-details.css'
})
export class CategoryDetails implements OnInit {
private activated = inject(ActivatedRoute);
constructor(private _CategoriesService:CategoriesService) {}

Id!: string | null;
specificCategory:any;

getCategoryId(){
  this.activated.paramMap.subscribe({
    next:(paramUrl)=>{
      this.Id = paramUrl.get('id')
    }
  })
}

getSpecificCategoryData(){
this._CategoriesService.getSpecificCategory(this.Id).subscribe({
  next:(res)=>{
    this.specificCategory = res.data
  }
})
}

ngOnInit():void{
  this.getCategoryId();
  this.getSpecificCategoryData();
}
}
