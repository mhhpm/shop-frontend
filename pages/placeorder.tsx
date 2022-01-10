import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import CheckoutWizard from '@utils/components/CheckoutWizard'
import Layout from '@utils/components/Layout'
import LoadingButton from '@utils/components/LoadingButton'
import { PageContainer } from '@utils/components/PageWrapper'
import { formatVND } from '@utils/helper'
import useCartContext from '@utils/hooks/useCartContext'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ClearCartItem } from 'store/actions'
import { VAT } from './cart'

function PlaceOrder() {
  const router = useRouter()
  const { cart, dispatch } = useCartContext()
  const { cartItems, shippingAddress } = cart

  const calcPrice = () =>
    cartItems.reduce(
      (total, { product, quantity }) =>
        total + product.attributes.price * quantity,
      0,
    )

  const totalPrice = calcPrice()
  const totalVAT = (totalPrice * VAT) / 100
  const totalShipping = totalPrice <= 500000 ? 30000 : 15000
  const totalMoney = totalPrice + totalVAT + totalShipping

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart')
    }
  }, [])

  const [loading, setLoading] = useState(false)
  const placeOrderHandler = async () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(ClearCartItem())
      setLoading(false)
      toast.success('Đặt hàng thành công')
      router.push(`/cart`)
    }, 1500)
  }
  return (
    <Layout title="Đơn đặt hàng" requireLogin={true}>
      <PageContainer>
        <CheckoutWizard activeStep={3}></CheckoutWizard>
        <Typography component="h4" variant="h4" className="mt-2">
          Đơn đặt hàng
        </Typography>

        <Grid container spacing={2}>
          <Grid item md={9} xs={12} className="mt-2">
            <Card>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Địa chỉ nhận hàng
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.country}
                </ListItem>
              </List>
            </Card>
            <Card className="mt-2">
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Các sản phẩm
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Ảnh</TableCell>
                          <TableCell>Tên</TableCell>
                          <TableCell align="center">Số lượng</TableCell>
                          <TableCell align="right">Giá</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.product.id}>
                            <TableCell>
                              <Link
                                href={`/products/${item.product.id}`}
                                passHref
                              >
                                <Image
                                  loader={() => item.product.attributes.image}
                                  src={item.product.attributes.image}
                                  alt={item.product.attributes.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </TableCell>

                            <TableCell>
                              <Link
                                href={`/products/${item.product.id}`}
                                passHref
                              >
                                <a>
                                  <Typography>
                                    {item.product.attributes.name}
                                  </Typography>
                                </a>
                              </Link>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {formatVND(item.product.attributes.price)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12} className="mt-2">
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h5" className="fw-bold">
                    Chi tiết đơn hàng
                  </Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tạm tính</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {formatVND(totalPrice)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Thuế:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {formatVND(totalVAT)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Ship:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {formatVND(totalShipping)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Tổng:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>{formatVND(totalMoney)}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <LoadingButton
                    onClick={placeOrderHandler}
                    variant="warning"
                    isLoading={loading}
                    className="w-100"
                  >
                    Đặt hàng
                  </LoadingButton>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false })
