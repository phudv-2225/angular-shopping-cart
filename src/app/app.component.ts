import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductService } from './services/product.service';
import { Product } from './models/product';
import { Size } from './models/size';
import { Sort } from './models/sort';
import { SortKey } from './constants/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular shopping cart';
  products: Product[];
  sizes: Size[];
  sorts: Sort[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initiSort();
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

  initiSort() {
    this.sorts = [
      {
        key: "",
        value: "Select"
      },
      {
        key: SortKey.lowest,
        value: "Lowest to highest"
      },
      {
        key: SortKey.highest,
        value: "Highest to lowest"
      }
    ];
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

  changeSortProduct(key: string){
    console.log(key)
    switch (key) {
      case SortKey.lowest:
        this.products.sort((product_1, product_2) => product_1.price - product_2.price);
        break;
      case SortKey.highest:
        this.products.sort((product_1, product_2) => product_2.price - product_1.price);
        break;
      default:
        this.getProduct();
        break;
    }
  }
}
