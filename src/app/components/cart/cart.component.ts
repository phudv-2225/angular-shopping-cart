import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { ItemInCart } from 'src/app/models/item_in_cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() isCartOpen: boolean;
  @Input() cart: Cart;
  mouseoverArray: Array<boolean>;

  constructor() { }

  ngOnInit(): void {
    this.mouseoverArray = new Array(this.cart.items.length);
  }

  changeCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  get countItems(): number {
    return this.cart.items.reduce((a, b) => {
      return a + b.count;
    }, 0)
  }

  get cartTotalPrice(): number {
    return  this.cart.items.reduce((a, b) => {
      return a + (b.product.price * b.count);
    }, 0)
  }

  get maxInstallmentPrice(): number {
    return this.cart.items.map(item => item.product.installments).sort((a, b) => a -b)[this.cart.items.length -1]
  }

  decreaseCountProduct(index: number) {
    if (this.cart.items[index].count > 1) {
      this.cart.items[index].count -= 1;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  increaseCountProduct(index: number) {
    this.cart.items[index].count += 1;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeItem(index: number) {
    this.cart.items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.mouseoverArray[index] = false;
  }

  mouseoverItem(index: number) {
    this.mouseoverArray[index] = true;
  }

  mouseoutItem(index: number) {
    this.mouseoverArray[index] = false;
  }
}
