import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../models';
import { ProductService } from 'src/app/product/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  public isValidForm: boolean = false;

  public isFormInit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IProduct
  ) {}

  @Output() onSubmit: EventEmitter<IProduct> = new EventEmitter();

  @Input() set product(product: IProduct) {
    if (!this.isFormInit) {
      this.initForm();

      this.isFormInit = true;
    }
    console.log('product changed', product);
    if (this.productForm) {
      this.prePopulateForm(product);
    }

    this._product = product;
  }

  private _product: IProduct;

  get product(): IProduct {
    return this._product;
  }

  public productForm?: FormGroup;

  ngOnInit() {
    if (this.dialogData) {
      this.product = this.dialogData;
    }
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
    if (this.isFormInit) return;
    //Initialize the product form
    if (product) {
    }
    this.productForm = new FormGroup({
      title: new FormControl('', []),
      description: new FormControl(''),
      category: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
      rating: new FormGroup({
        count: new FormControl(''),
        rate: new FormControl(''),
      }),
      id: new FormControl(''),
    });
  }

  public submit(): void {
    // this.product.title = this.productForm.value.title;
    this.product = {
      ...this.product,
      ...this.productForm.value,
    };
    if (this.dialogRef) {
      this.dialogRef.close(this.product);
    } else {
      this.onSubmit.emit(this.product);
    }

    console.log('new value::::', this.product);
  }
}
