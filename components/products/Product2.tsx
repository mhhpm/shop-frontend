import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import LinesEllipsis from 'react-lines-ellipsis'
import { numberWithCommas } from '@utils/libs/helpers'
import { IProduct } from '@utils/types/product'
interface IProps {
  id: string
  name: string
  image: string
  price: number
  reviewPoints: number
  oldPrice?: number
  isSale?: boolean
}

const Product = ({ id, attributes }: IProduct) => {
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
          {numberWithCommas(attributes.price)} <sup>đ</sup>
        </div>
      </Card.Body>
      <Card.Footer className="pt-0 pb-4 mb-2 border-top-0 bg-transparent">
        <div className="text-center">
          <Button variant="outline-dark" className="mt-auto">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default Product
