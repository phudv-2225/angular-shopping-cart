import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { formatPrice } from '../../functions/utils';
import { Cart } from 'src/app/models/cart';
import { BindingFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  isCartOpen = false;
  cart: Cart

  constructor() { }

  ngOnInit(): void {
    this.getCart();
  }

  get imageProduct(): string {
    return "/assets/images/" + this.product.sku + ".jpg";
  }

  get nuberBeforeDot(): string {
    let price = formatPrice(this.product.price, this.product.currencyId);
    return price.substr(0, price.length - 3);
  }

  get nuberAfterDot(): string {
    let price = formatPrice(this.product.price, this.product.currencyId);
    return price.substr(price.length - 3, 3);
  }

  get isInstallment(): boolean {
    return this.product.installments > 0;
  }

  get installmentPrice(): string {
    if (this.isInstallment) {
      return formatPrice((this.product.price / this.product.installments), this.product.currencyId);
    }
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
