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
  DeleteItem = 'cart/delete',
}

export interface IAddToCartAction {
  type: CartActionType.AddToCart
  payload: { productId: string; quantity: number }
}

export interface IDeleteCartAction {
  type: CartActionType.DeleteItem
  payload: string
}

type CartActions = IAddToCartAction | IDeleteCartAction

//Store

export type Actions = CartActions

export interface IStoreState {
  cart: null | ICart
}

export interface IAppContext {
  state: IStoreState
  dispatch: React.Dispatch<Actions>
}
