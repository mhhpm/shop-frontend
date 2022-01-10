import { IProduct } from '@utils/types/product'

//Define Type
export interface ICartItem {
  product: IProduct
  quantity: number
}

export interface IShipping {
  fullName: string
  address: string
  city: string
  country: string
}

export interface ICart {
  cartItems: ICartItem[]
  shippingAddress: IShipping
}

//Cart Action
export enum CartActionType {
  AddToCart = 'cart/add',
  UpdateCartItem = 'cart/update',
  DeleteItem = 'cart/delete',
  ClearCartItems = 'cart/clear',
  UpdateShippingAddress = '/cart/updateShipping',
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

export interface IClearCartAction {
  type: CartActionType.ClearCartItems
}

export interface IUpdateShippingAddress {
  type: CartActionType.UpdateShippingAddress
  payload: IShipping
}

type CartActions =
  | IAddToCartAction
  | IDeleteCartAction
  | IUpdateCartItemAction
  | IUpdateShippingAddress
  | IClearCartAction

//Store

export type Actions = CartActions

export interface IStoreState {
  cart: ICart
}

export interface IAppContext {
  state: IStoreState
  dispatch: React.Dispatch<Actions>
}
