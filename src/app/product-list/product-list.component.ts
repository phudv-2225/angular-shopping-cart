import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { Sort } from '../models/sort';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Output() onChangeSortProduct: EventEmitter<string> = new EventEmitter<string>();
  @Input() products: Product[];
  @Input() sorts: Sort[];
  isCartOpen = false;
  cart: Cart

  constructor() { }

  ngOnInit(): void {
    this.getCart();
  }

  changeSortProduct($event) {
    this.onChangeSortProduct.emit($event.target.value);
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || {items: []};
  }

  addToCart(product: Product) {
    this.getCart();
    let item_exists_index = this.cart.items.findIndex(item => {
      return item.product.id === product.id
    });

    if (item_exists_index < 0) {
      this.cart.items = this.cart.items.concat({product: product, count: 1})
    } else {
      this.cart.items[item_exists_index].count += 1
    }
    
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.isCartOpen = true;
  }
}
