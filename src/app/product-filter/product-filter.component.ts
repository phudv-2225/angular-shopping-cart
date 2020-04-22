import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Size } from '../models/size';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  @Output() onClickFilterProduct: EventEmitter<Size> = new EventEmitter<Size>();
  @Output() onClickRepo: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() sizes: Size[];

  constructor() { }

  ngOnInit(): void {
  }

  toggleCheckboxChange(size: Size) {
    this.onClickFilterProduct.emit(size);
  }

  clickRepo() {
    this.onClickRepo.emit(true);
  }

}
