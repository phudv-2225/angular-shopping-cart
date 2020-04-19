import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductService } from './services/product.service';
import { Product } from './models/product';
import { Size } from './models/size';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular shopping cart';
  products: Product[];
  sizes: Size[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getSizes();
    this.getProduct();
  }

  getProduct(){
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  getSizes(){
    this.productService.getSizes().subscribe((data: any) => {
      this.sizes = data;
    });
  }

  filterBySizes() {
    let sizes = this.sizes.filter((size: Size) => size.checked === true);
    this.productService.filterProductBySize(sizes).subscribe((data: any) => {
      this.products = data;
    });
  }

  clickFilterProduct(size: Size) {
    size.checked = !size.checked;
    this.filterBySizes();
  }
}
