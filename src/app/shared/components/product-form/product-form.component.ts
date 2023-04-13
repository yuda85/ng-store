import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  public productForm?: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    //Initialize the product form
    this.productForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      rating: new FormGroup({
        count: new FormControl(''),
        rate: new FormControl(''),
      }),
      id: new FormControl('', [Validators.required]),
    });
  }

  public submit(): void {
    console.log(this.productForm);
  }
}
