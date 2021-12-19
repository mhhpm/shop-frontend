import { CartActionType, IAddToCartAction, IDeleteCartAction } from './types'

//Cart
export const AddToCart = (
  productId: string,
  quantity: number,
): IAddToCartAction => ({
  type: CartActionType.AddToCart,
  payload: { productId, quantity },
})

export const DeleteCartItem = (productId: string): IDeleteCartAction => ({
  type: CartActionType.DeleteItem,
  payload: productId,
})
