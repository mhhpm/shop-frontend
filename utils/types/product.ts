import { Base } from '@utils/models/base'

enum Status {
  Visible = 'visible',
  Hidden = 'hidden',
  Deleted = 'deleted',
}

export interface IProduct {
  id: string
  attributes: Base & {
    name: string
    price: number
    weight: number
    //review: string// 1-n
    rating: number
    quantity: number
    status: Status
    image: string
    discription: string
  }
}

interface Review {
  productId: string
  points: number
  content: string
}

interface Product {
  name: string
  price: number
  weight: number
  rating: number
  quantity: number
  status: Status
  image: string
  author: string
  discription: string
  category: string
}
