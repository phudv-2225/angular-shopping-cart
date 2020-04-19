import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Size } from '../models/size';
import { regexFilterBySize } from '../functions/utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/products/';
  private sizeUrl = 'api/sizes/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.sizeUrl);
  }

  filterProductBySize(sizes: Size[]): Observable<Product[]> {
    let filterSizes = sizes.map((size: Size) => {
      regexFilterBySize(size.key)
    }).join("|");

    let urlFilterSizes = this.productsUrl + "?availableSizes=(" + filterSizes + ")";

    return this.http.get<Product[]>(urlFilterSizes);
  }
}
