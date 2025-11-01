import { Component } from '@angular/core';
import { Products } from "../products/products";
import { Categories } from "../categories/categories";
import { MainSlider } from "../main-slider/main-slider";
import { CategorySlider } from "../category-slider/category-slider";

@Component({
  selector: 'app-home',
  imports: [Products, MainSlider, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
