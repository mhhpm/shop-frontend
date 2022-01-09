import CartItem from '@components/cart/CartItem'
import Layout from '@utils/components/Layout'
import { PageContainer } from '@utils/components/PageWrapper'
import { formatVND } from '@utils/helper'
import useCartContext from '@utils/hooks/useCartContext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

const CartContainer = styled(PageContainer)`
  .image-col {
    width: 100px;
  }
`

const VAT = 5
function Cart() {
  const {
    cart: { cartItems },
  } = useCartContext()

  const calcPrice = () =>
    cartItems.reduce(
      (total, { product, quantity }) =>
        total + product.attributes.price * quantity,
      0,
    )

  const totalPrice = calcPrice()
  const totalVAT = (totalPrice * VAT) / 100
  const totalMoney = totalPrice + totalVAT

  return (
    <Layout title="Giỏ hàng">
      <CartContainer>
        <Row className="gap-4">
          <Col lg={9} className="d-flex flex-column">
            {cartItems.length > 0 ? (
              <>
                <Row className="border-bottom border-2 py-2 fw-bold">
                  <Col xs={3} className="image-col">
                    Ảnh
                  </Col>
                  <Col>Tên</Col>
                  <Col xs={2} lg={3}>
                    Giá
                  </Col>
                  <Col xs={2} lg={3} className="ps-4">
                    Số lượng
                  </Col>
                  <Col xs={1}>Xóa</Col>
                </Row>
                {cartItems.map(
                  ({
                    product: {
                      id,
                      attributes: { name, price, image },
                    },
                    quantity,
                  }) => (
                    <CartItem
                      key={id}
                      id={id}
                      name={name}
                      price={price}
                      quantity={quantity}
                      image={image}
                    />
                  ),
                )}
              </>
            ) : (
              <div className="mx-auto w-100 text-center">
                <Alert variant="warning">
                  Giỏ hàng rỗng.{' '}
                  <Link href="/products" passHref>
                    <Alert.Link>Tiếp tục mua sắm</Alert.Link>
                  </Link>
                </Alert>
              </div>
            )}
          </Col>
          <Col>
            <div className="border rounded p-4">
              <h4>Thông tin</h4>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-row justify-content-between">
                  <div>Tạm tính</div>
                  <div>{formatVND(totalPrice)}</div>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <div>Thuế ({VAT}%) </div>
                  <div>{formatVND(totalVAT)}</div>
                </div>
                <div className="d-flex flex-row justify-content-between fw-bold pt-2 border-top">
                  <div>Tổng </div>
                  <div>{formatVND(totalMoney)}</div>
                </div>
                <Button variant="warning" disabled={cartItems.length === 0}>
                  Đặt mua
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </CartContainer>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false })
