import { formatVND } from '@utils/helper'
import useCartContext from '@utils/hooks/useCartContext'
import { IProduct } from '@utils/types/product'
import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'
import { DeleteCartItem } from 'store/actions'
import styled from 'styled-components'
import Img from '../../assets/sach.jpg'

type IProps = {
  id: string
  name: string
  image?: string
  quantity: number
  price: number
}

export default function CartItem({ id, name, image, quantity, price }: IProps) {
  const { dispatch } = useCartContext()
  const handleRemove = () => {
    dispatch(DeleteCartItem(id))
  }
  return (
    <Row className="border-bottom border-1 py-3 align-items-center">
      <Col xs={3} className="image-col">
        <Image src={Img} width={50} height={50} alt="image" />
      </Col>
      <Col> {name}</Col>
      <Col xs={2} lg={3}>
        {formatVND(price)}
      </Col>
      <Col xs={2} lg={3}>
        {quantity}
      </Col>
      <Col xs={1}>
        <DeleteIcon className="bi bi-trash" onClick={handleRemove} />
      </Col>
    </Row>
  )
}

const DeleteIcon = styled.i`
  cursor: pointer;
  padding: 8px;
  border-radius: 40px;

  &:hover {
    background: #f8f8f8;
  }
`
