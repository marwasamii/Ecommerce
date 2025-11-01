import { Component, OnInit, signal } from '@angular/core';
import { Navbar } from "./shared/component/navbar/navbar";
import { Footer } from './shared/component/footer/footer';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecommerce');
 
 
}
