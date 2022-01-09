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
    rating: number
    quantity: number
    status: Status
    image: string
    description: string
  }
}
