import LoadingButton from '@utils/components/LoadingButton'
import useCartContext from '@utils/hooks/useCartContext'
import { getProduct } from '@utils/services/product'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { AddToCart } from 'store/actions'

interface IProps {
  id: string
  name: string
  image: string
  price: number
  reviewPoints: number
  oldPrice?: number
  isSale?: boolean
}

const Product = ({
  id,
  name,
  image,
  price,
  reviewPoints,
  oldPrice,
  isSale,
}: IProps) => {
  const { dispatch } = useCartContext()
  const [loading, setLoading] = useState(false)

  const handleAddTocart = async () => {
    try {
      setLoading(true)
      const product = await getProduct(id)
      dispatch(AddToCart(product, 1))
    } catch (error) {
      toast.error('Có lỗi xảy ra!')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card className="card h-100 ">
      <Link href={`/products/${id}`}>
        <a>
          <Image
            className="card-img-top"
            loader={() => image}
            src={'image'}
            alt="..."
            width={450}
            height={300}
          />
        </a>
      </Link>
      <Card.Body className="px-0 pt-4 postion-relative">
        {isSale && (
          <div className="badge bg-warning text-white position-absolute top-0 end-0 m-1">
            Sale
          </div>
        )}
        <div className="text-center">
          <Link href={`/products/${id}`}>
            <a className="fw-bolder">{name}</a>
          </Link>
          <div className="d-flex gap-1 justify-content-center small text-warning my-2">
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
            <div className="bi-star-fill"></div>
          </div>
          {oldPrice && (
            <span className="text-muted text-decoration-line-through me-2">
              ${oldPrice}
            </span>
          )}
          ${price}
        </div>
      </Card.Body>
      <Card.Footer className="pt-0 pb-4 mb-2 border-top-0 bg-transparent">
        <div className="text-center">
          <LoadingButton
            variant="outline-dark"
            className="mt-auto"
            onClick={handleAddTocart}
            isLoading={loading}
          >
            Add to cart
          </LoadingButton>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default Product
