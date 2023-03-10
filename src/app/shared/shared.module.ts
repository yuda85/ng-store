import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CardComponent],
})
export class SharedModule {}
