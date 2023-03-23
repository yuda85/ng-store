import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { MaterialModule } from '../material/material.module';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent, EditProductComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
})
export class AdminModule {}
