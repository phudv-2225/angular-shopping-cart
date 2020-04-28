import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() onAddToCart: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
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

  addToCart(product: Product) {
    this.onAddToCart.emit(product);
  }
}
