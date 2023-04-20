import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ProductStateModel } from './product.model';
import { ClearCart, DeleteCartItem, SetCartItem } from './product.actions';
import { IProduct } from 'src/app/shared/models';

@Injectable()
@State<ProductStateModel>({
  name: 'product',
  defaults: {
    cartItems: [],
  },
})
export class ProductState {
  @Action(ClearCart)
  clearCart(ctx: StateContext<ProductStateModel>) {
    ctx.patchState({
      cartItems: [],
    });
  }

  @Action(SetCartItem)
  setCartItem(ctx: StateContext<ProductStateModel>, action: SetCartItem) {
    const cartItems: Array<IProduct> = ctx.getState().cartItems;

    cartItems.push(action.payload);

    ctx.patchState({
      cartItems: cartItems,
    });

    console.log(ctx.getState());
  }

  @Action(DeleteCartItem)
  deleteCartItem(ctx: StateContext<ProductStateModel>, action: DeleteCartItem) {
    const cartItems: Array<IProduct> = ctx.getState().cartItems;

    const index = cartItems.findIndex((item) => item.id === action.id);

    cartItems.splice(index, 1);

    ctx.patchState({
      cartItems: cartItems,
    });
  }
}
