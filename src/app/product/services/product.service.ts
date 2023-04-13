import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { Routes } from 'src/app/core/http/API';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct } from 'src/app/shared/models';
import { PRODUCTS_MOCK } from './products.mock';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private productsSubject$: BehaviorSubject<IProduct[]> = new BehaviorSubject(
    []
  );

  public getProducts$(): Observable<IProduct[]> {
    return this.productsSubject$.asObservable();
  }

  public fetchProducts(): void {
    const existingData: IProduct[] = this.storageService.getData('products');

    if (existingData) {
      this.productsSubject$.next(existingData);
    } else {
      //http
      this.http.get<IProduct[]>(Routes['allProducts']).subscribe((data) => {
        this.storageService.setData('products', data);
        this.productsSubject$.next(data);
      });

      //mock
      // setTimeout(() => {
      //   of(PRODUCTS_MOCK).subscribe((data) => {
      //     debugger;
      //     this.storageService.setData('products', data);
      //     this.productsSubject$.next(data);
      //   });
      // }, 3000);
    }
  }

  public getProductById(id: number): IProduct {
    this.fetchProducts();

    const productsList = this.productsSubject$.value;

    const productIndex: number = productsList.findIndex(
      (product) => product.id === id
    );

    if (productsList[productIndex]) {
      return productsList[productIndex];
    } else {
      return null;
    }
  }
}
