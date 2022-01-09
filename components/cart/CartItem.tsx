import { formatVND } from '@utils/helper'
import useCartContext from '@utils/hooks/useCartContext'
import Image from 'next/image'
import { Col, InputGroup, Row } from 'react-bootstrap'
import { DeleteCartItem, UpdateCartItem } from 'store/actions'
import styled from 'styled-components'

type IProps = {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

export default function CartItem({ id, name, image, quantity, price }: IProps) {
  const { dispatch } = useCartContext()
  const handleRemove = () => {
    dispatch(DeleteCartItem(id))
  }
  const handleUpdate = (value: number) => {
    if (value === 0) {
      dispatch(DeleteCartItem(id))
      return
    }
    dispatch(UpdateCartItem(id, value))
  }

  return (
    <Row className="border-bottom border-1 py-3 align-items-center">
      <Col xs={3} className="image-col ps-0">
        <Image
          loader={() => image}
          src={'image'}
          width={60}
          height={60}
          alt="image"
        />
      </Col>
      <Col> {name}</Col>
      <Col xs={2} lg={3}>
        {formatVND(price)}
      </Col>
      <Col xs={2} lg={3}>
        <div>
          <ButtonIcon
            className="bi bi-dash rounded"
            onClick={() => handleUpdate(quantity - 1)}
          />
          <InputGroup.Text className="d-inline mx-1">
            {quantity}
          </InputGroup.Text>
          <ButtonIcon
            className="bi bi-plus rounded"
            onClick={() => handleUpdate(quantity + 1)}
          />
        </div>
      </Col>
      <Col xs={1}>
        <ButtonIcon
          className="bi bi-trash rounded-circle"
          onClick={handleRemove}
        />
      </Col>
    </Row>
  )
}

const ButtonIcon = styled.i`
  cursor: pointer;
  padding: 8px;

  &:hover {
    background: #f8f8f8;
  }
`
