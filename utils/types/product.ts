import { Base } from '@utils/models/base'
enum Status {
  Visible = 'visible',
  Hidden = 'hidden',
  Deleted = 'deleted',
}

export interface IProduct {
  id: string
  attributes: Base & Product
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
  description: string
}
