import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  map,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { Routes } from 'src/app/core/http/API';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct } from 'src/app/shared/models';
import { PRODUCTS_MOCK } from './products.mock';

import * as uuid from 'uuid';
import { Store } from '@ngxs/store';
import {
  DeleteCartItem,
  SetCartItem,
} from 'src/app/core/state/product/product.actions';
import { ProductStateSelectors } from 'src/app/core/state/product/product.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //     this.productsSubject$.next(data);
  //   });
  // }, 3000);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private store: Store
  ) {}

  private productsSubject$: BehaviorSubject<IProduct[]> = new BehaviorSubject(
    []
  );

  public getProducts$(): Observable<IProduct[]> {
    return this.productsSubject$.asObservable();
  }

  public fetchProducts(): void {
    const existingData: IProduct[] = this.storageService.getData('products');
    debugger;
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
    debugger;
    const productsList = this.productsSubject$.value;

    const productIndex: number = productsList.findIndex(
      (product) => product.id === Number(id)
    );

    if (productsList[productIndex]) {
      return productsList[productIndex];
    } else {
      return null;
    }
  }

  public onProductChange(newProduct: IProduct) {
    const productsList = this.productsSubject$.value;

    const productIndex: number = productsList.findIndex(
      (product) => product.id === newProduct.id
    );

    productsList[productIndex] = newProduct;

    this.storageService.setData('products', productsList);

    this.fetchProducts();
  }

  public addNewProduct(result: IProduct): void {
    const productsList = this.productsSubject$.value;

    result.id = uuid.v4(); // productsList.length + 1; // OR generate random id

    debugger;
    productsList.push(result);
    this.storageService.setData('products', productsList);

    this.fetchProducts();
  }

  public addToCart(product: IProduct): void {
    debugger;
    this.store.dispatch(new SetCartItem(product));
  }

  public isProductInCart$(productId: number): Observable<boolean> {
    return this.store.select(ProductStateSelectors.cartItems).pipe(
      map((data) => {
        const isInCart = data.some((Item) => Item.id === productId);

        return isInCart;
      })
    );
  }

  removeFromCart(id: number) {
    this.store.dispatch(new DeleteCartItem(id));
  }
}
