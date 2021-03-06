import { IResponse } from '@utils/models/response'
import axios from 'axios'
import { API } from 'environment'
import { IProduct } from '../types/product'

export const getProducts = async () => {
  const { data } = await axios.get<IResponse<IProduct[]>>(API + '/products')
  return data
}

export const getProductByURL = async (URL: string) => {
  const { data } = await axios.get<IResponse<IProduct[]>>(
    API + '/products' + URL,
  )
  return data
}

export const getProduct = async (id: string) => {
  const { data } = await axios.get<IResponse<IProduct>>(API + `/products/${id}`)
  return data.data
}
