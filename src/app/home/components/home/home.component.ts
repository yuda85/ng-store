import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, debounceTime, delay } from 'rxjs';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts$().subscribe((data) => {
      console.log('all products', data);
      this.products = data;

      const newProd = data[5];
      newProd.id = 92;
      data.push(newProd);

      setTimeout(() => {
        this.products = [];
        this.products = data;
      }, 5000);
    });
    this.productService.fetchProducts();
  }

  ngOnDestroy(): void {}

  public isInCart(productId: number): Observable<boolean> {
    return this.productService.isProductInCart$(productId);
  }

  /*
  1. add input to app-card component
  2. inside app card display all product fields
  */

  public addToCart(product: IProduct): void {
    this.productService.addToCart(product);
  }

  public removeFromCart(id: number): void {
    this.productService.removeFromCart(id);
  }

  public trackByFn(index: number): number {
    return index;
  }
}
