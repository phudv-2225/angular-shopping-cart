import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() isCartOpen: boolean;
  @Input() cart: Cart;

  constructor() { }

  ngOnInit(): void {
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

}
