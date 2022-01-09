import LoadingButton from '@utils/components/LoadingButton'
import { formatVND } from '@utils/helper'
import useCartContext from '@utils/hooks/useCartContext'
import { getProduct } from '@utils/services/product'
import { IProduct } from '@utils/types/product'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import toast from 'react-hot-toast'
import LinesEllipsis from 'react-lines-ellipsis'
import { AddToCart } from 'store/actions'

const Product = ({ id, attributes }: IProduct) => {
  const { dispatch } = useCartContext()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      const product = await getProduct(id)
      product.attributes.description = ''
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
            loader={() => attributes.image}
            src={'image'}
            alt="..."
            width={450}
            height={300}
          />
        </a>
      </Link>
      <Card.Body className="px-0 pt-4 postion-relative">
        <div className="text-center">
          <Link href={`/products/${id}`}>
            <LinesEllipsis
              text={attributes.name}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Link>
          <div className="d-flex gap-1 justify-content-center small text-warning my-2">
            {[...Array(attributes.rating)].map((item, indx) => (
              <div className="bi-star-fill" key={indx}></div>
            ))}
          </div>
          {formatVND(attributes.price)}
        </div>
      </Card.Body>
      <Card.Footer className="pt-0 pb-4 mb-2 border-top-0 bg-transparent">
        <div className="text-center">
          <LoadingButton
            variant="outline-dark"
            className="mt-auto"
            isLoading={loading}
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </LoadingButton>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default Product
