import Cookies from 'js-cookie'
import React, { createContext, useReducer } from 'react'
import { Actions, CartActionType, IAppContext, IStoreState } from './types'

const initialState: IStoreState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems') as string)
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress') as string)
      : {
          fullName: '',
          city: '',
          country: '',
          address: '',
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

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.product.id === existItem.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.cart.cartItems, action.payload]

      Cookies.set('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }

    case CartActionType.UpdateCartItem:
      const { productId, quantity } = action.payload

      const cartItemsUpdate = state.cart.cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      )
      Cookies.set('cartItems', JSON.stringify(cartItemsUpdate))
      return { ...state, cart: { ...state.cart, cartItems: cartItemsUpdate } }

    case CartActionType.DeleteItem:
      const productIdDelete = action.payload
      const newCartItems = state.cart.cartItems.filter(
        (item) => item.product.id !== productIdDelete,
      )
      Cookies.set('cartItems', JSON.stringify(newCartItems))
      return { ...state, cart: { ...state.cart, cartItems: newCartItems } }

    case CartActionType.ClearCartItems:
      Cookies.remove('cartItems')
      return {
        ...state,
        cart: { ...state.cart, cartItems: initialState.cart.cartItems },
      }

    case CartActionType.UpdateShippingAddress:
      Cookies.set('shippingAddress', JSON.stringify(action.payload))
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: { ...action.payload },
        },
      }
    default:
      return state
  }
}

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, AppProvider }
