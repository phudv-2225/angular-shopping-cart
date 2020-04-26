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
    if (this.cart.items.length === 0) {
      return 0
    } else {
      let count = 0;
      this.cart.items.map(item => {
        count += item.count;
      })
      return count
    }
  }

  get cartTotalPrice(): number {
    if (this.cart.items.length === 0) {
      return 0
    } else {
      let total = 0;
      this.cart.items.map(item => {
        total += item.product.price * item.count;
      })
      return total
    }
  }

  get maxInstallmentPrice(): number {
    return this.cart.items.map(item => item.product.installments).sort((a, b) => a -b)[this.cart.items.length -1]
  }

}
