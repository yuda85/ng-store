import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/shared/models';
import { PRODUCTS_MOCK } from './products.mock';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  public getProducts$(): Observable<IProduct[]> {
    return of(PRODUCTS_MOCK);
  }
}
