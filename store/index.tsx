import React, { createContext, useReducer } from 'react'
import { Actions, CartActionType, IAppContext, IStoreState } from './types'

const initialState: IStoreState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : null,
}

const store = createContext<IAppContext>({
  state: initialState,
  dispatch: () => null,
})

const { Provider } = store

const reducer = (state: IStoreState, action: Actions): IStoreState => {
  switch (action.type) {
    case CartActionType.AddToCart:
      //plapla....
      return state
    case CartActionType.DeleteItem:
      //plapla
      return state
    default:
      return state
  }
}

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, AppProvider }
