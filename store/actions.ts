import { IProduct } from '@utils/types/product'
import {
  CartActionType,
  IAddToCartAction,
  IClearCartAction,
  IDeleteCartAction,
  IShipping,
  IUpdateCartItemAction,
  IUpdateShippingAddress,
} from './types'

//Cart
export const AddToCart = (
  product: IProduct,
  quantity: number,
): IAddToCartAction => {
  return {
    type: CartActionType.AddToCart,
    payload: { product, quantity },
  }
}

export const UpdateCartItem = (
  productId: string,
  quantity: number,
): IUpdateCartItemAction => {
  return {
    type: CartActionType.UpdateCartItem,
    payload: { productId, quantity },
  }
}

export const DeleteCartItem = (productId: string): IDeleteCartAction => ({
  type: CartActionType.DeleteItem,
  payload: productId,
})

export const ClearCartItem = (): IClearCartAction => ({
  type: CartActionType.ClearCartItems,
})

export const UpdateShippingAddress = (
  info: IShipping,
): IUpdateShippingAddress => ({
  type: CartActionType.UpdateShippingAddress,
  payload: info,
})
