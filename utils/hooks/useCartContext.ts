import { useContext } from 'react'
import { store } from 'store'

const useCartContext = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(store)
  return { cart, dispatch }
}

export default useCartContext
