import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  public id: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.sub.add(
      this.activatedRoute.params.subscribe((data) => {
        this.id = data['id'];
        console.log(this.id);
      })
    );
  }

  ngOnDestroy() {
    console.log("I'm Destroyed!!!!");
    this.sub.unsubscribe();
  }

  //get the product from the product Service
  //implement in product servce: Get Ptoduct By Id
  //log the product!
}
