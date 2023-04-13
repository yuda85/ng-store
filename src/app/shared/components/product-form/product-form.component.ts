import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  public isValidForm: boolean = false;

  @Input() set product(product: IProduct) {
    console.log('product changed', product);
    if (this.productForm) {
      // this.prePopulateForm(product);
    }

    this._product = product;
  }

  private _product: IProduct;

  get product(): IProduct {
    return this._product;
  }

  public productForm?: FormGroup;

  ngOnInit() {
    this.initForm(this.product);

    setTimeout(() => {
      this.isValidForm = true;
    }, 3000);
  }

  public getControl(control: string): FormControl {
    return this.productForm.controls[control] as FormControl;
  }

  private prePopulateForm(product: IProduct): void {
    this.productForm.patchValue({
      title: product.title,
    });
  }

  ngOnChanges() {}

  private initForm(product?: IProduct): void {
    //Initialize the product form
    if (product) {
    }
    this.productForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
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
