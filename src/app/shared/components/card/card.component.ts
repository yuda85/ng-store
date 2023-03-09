import { Component, Input } from '@angular/core';
import { IProduct } from '../../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product?: IProduct;
}
