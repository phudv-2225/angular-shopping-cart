import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isCartOpen = false;
  showCartIcon = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeCart() {
    this.isCartOpen = !this.isCartOpen;
  }

}
