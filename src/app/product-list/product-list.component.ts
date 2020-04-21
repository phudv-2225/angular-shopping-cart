import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { Sort } from '../models/sort';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Output() onChangeSortProduct: EventEmitter<string> = new EventEmitter<string>();
  @Input() products: Product[];
  @Input() sorts: Sort[];

  constructor() { }

  ngOnInit(): void {
  }

  changeSortProduct($event) {
    this.onChangeSortProduct.emit($event.target.value);
  }

}
