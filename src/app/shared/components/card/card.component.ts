import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models';
import { logThis } from 'src/app/utils/log.consts';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product?: IProduct;
  @Input() isInCart: boolean;

  @Output() addToCart: EventEmitter<IProduct> = new EventEmitter();
  @Output() onRemoveFromCart: EventEmitter<number> = new EventEmitter();

  public onAddToCart(product: IProduct): void {
    this.addToCart.emit(product);
  }

  public removeFromCart(id: number): void {
    this.onRemoveFromCart.emit(id);
  }

  ngOnInit() {
    logThis('wow!!!');
  }
}
