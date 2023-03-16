import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { EditProductComponent } from './components/edit-product/edit-product.component';

@NgModule({
  declarations: [AdminComponent, EditProductComponent],
  imports: [CommonModule, MaterialModule],
})
export class AdminModule {}
