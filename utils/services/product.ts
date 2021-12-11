import axios from 'axios'
import { API } from 'environment'
import { IProduct } from '../types/product'

export const getProducts = async () => {
  const { data } = await axios.get<IProduct[]>(API + '/products')
  return data
}
