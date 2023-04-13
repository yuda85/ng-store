import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  public product: IProduct;
  public id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.sub.add(
      this.activatedRoute.params.subscribe((data) => {
        this.id = data['id'];
        console.log(this.id);

        this.product = this.productService.getProductById(this.id);

        console.log(this.product);

        //this is an example for changing the input value dynamically
        // setTimeout(() => {
        //   debugger;
        //   this.product = this.productService.getProductById(19);
        // }, 4000);
      })
    );
  }

  ngOnDestroy() {
    console.log("I'm Destroyed!!!!");
    this.sub.unsubscribe();
  }

  public onSubmit(product: IProduct) {
    this.productService.onProductChange(product);
  }

  //get the product from the product Service
  //implement in product servce: Get Ptoduct By Id
  //log the product!
}
