import { Selector } from '@ngxs/store';
import { ProductState } from './product.state';
import { ProductStateModel } from './product.model';

export class ProductStateSelectors {
  @Selector([ProductState])
  static cartItems(state: ProductStateModel) {
    return state.cartItems;
  }
}
