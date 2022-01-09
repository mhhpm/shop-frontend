import React, { createContext, useReducer } from 'react'
import {
  Actions,
  CartActionType,
  IAppContext,
  ICartItem,
  IStoreState,
} from './types'

const initialState: IStoreState = {
  cart: {
    cartItems: [],
    shippingAddress: {
      street: '',
      city: '',
      country: '',
    },
  },
}

const store = createContext<IAppContext>({
  state: initialState,
  dispatch: () => null,
})

const { Provider } = store

const reducer = (state: IStoreState, action: Actions): IStoreState => {
  switch (action.type) {
    case CartActionType.AddToCart:
      const { product } = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item.product.id === product.id,
      )

      if (existItem) {
        const newItem: ICartItem = {
          ...existItem,
          quantity: existItem.quantity + 1,
        }
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: state.cart.cartItems.map((item) =>
              item.product.id !== existItem.product.id ? item : newItem,
            ),
          },
        }
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, action.payload],
          },
        }
      }

    case CartActionType.UpdateCartItem:
      const { productId, quantity } = action.payload
      const existItemUpdate = state.cart.cartItems.find(
        (item) => item.product.id === productId,
      )

      if (existItemUpdate) {
        const newItemUpdate: ICartItem = {
          ...existItemUpdate,
          quantity,
        }
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: state.cart.cartItems.map((item) =>
              item.product.id !== existItemUpdate.product.id
                ? item
                : newItemUpdate,
            ),
          },
        }
      }
      return state
    case CartActionType.DeleteItem:
      const productIdDelete = action.payload
      const newCartItems = state.cart.cartItems.filter(
        (item) => item.product.id !== productIdDelete,
      )
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } }
    default:
      return state
  }
}

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, AppProvider }
