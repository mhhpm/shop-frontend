import { IProduct } from '@utils/types/product'

//Define Type
export interface ICartItem {
  product: IProduct
  quantity: number
}

export interface ICart {
  cartItems: ICartItem[]
  shippingAddress: {
    street: string
    city: string
    country: string
  }
}

//Cart Action
export enum CartActionType {
  AddToCart = 'cart/add',
  UpdateCartItem = 'cart/update',
  DeleteItem = 'cart/delete',
}

export interface IAddToCartAction {
  type: CartActionType.AddToCart
  payload: { product: IProduct; quantity: number }
}

export interface IUpdateCartItemAction {
  type: CartActionType.UpdateCartItem
  payload: { productId: string; quantity: number }
}

export interface IDeleteCartAction {
  type: CartActionType.DeleteItem
  payload: string
}

type CartActions = IAddToCartAction | IDeleteCartAction | IUpdateCartItemAction

//Store

export type Actions = CartActions

export interface IStoreState {
  cart: ICart
}

export interface IAppContext {
  state: IStoreState
  dispatch: React.Dispatch<Actions>
}
