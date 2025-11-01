import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/service/catrgories/categories-service';
import { CategorySlider } from "../category-slider/category-slider";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [CategorySlider, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  private category = inject(CategoriesService);
  categoriesList: WritableSignal<any[]> = signal([]);
  @Input() inHome: boolean = false;
  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.category.getAllCategories().subscribe({
      next: (res) => {
        console.log('Categories', res.data)
        this.categoriesList.set(res.data);
      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
