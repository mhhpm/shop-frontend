import { List, ListItem, TextField, Typography } from '@mui/material'
import CheckoutWizard from '@utils/components/CheckoutWizard'
import Layout from '@utils/components/Layout'
import { PageContainer } from '@utils/components/PageWrapper'
import useCartContext from '@utils/hooks/useCartContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { UpdateShippingAddress } from 'store/actions'
import { IShipping } from 'store/types'
import styled from 'styled-components'

interface IDataForm extends IShipping {}
export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IDataForm>()
  const router = useRouter()
  const { cart, dispatch } = useCartContext()
  const { shippingAddress } = cart
  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('country', shippingAddress.country)
  }, [])

  const submitHandler = (data: IDataForm) => {
    dispatch(UpdateShippingAddress(data))
    router.push('/placeorder')
  }

  return (
    <Layout title="Shipping Address" requireLogin>
      <ShippingPage>
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h4" variant="h4" className="text-center mt-5">
            Địa chỉ giao hàng
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="Họ tên"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === 'minLength'
                          ? 'Họ tên phải có độ dài lớn hơn 1'
                          : 'Đây là trường bắt buộc'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Địa chỉ"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                          ? 'Địa chỉ phải có độ dài lớn hơn 1'
                          : 'Đây là trường bắt buộc'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="Thành phố"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === 'minLength'
                          ? 'Thành phố phải có độ dài lớn hơn 1'
                          : 'Đây là trường bắt buộc'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="country"
                    label="Country"
                    error={Boolean(errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === 'minLength'
                          ? 'Quốc gia phải có độ dài lớn hơn 1'
                          : 'Đây là trường bắt buộc'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                variant="warning"
                type="submit"
                className="w-100"
                size="lg"
              >
                Tiếp tục
              </Button>
            </ListItem>
          </List>
        </form>
      </ShippingPage>
    </Layout>
  )
}

const ShippingPage = styled(PageContainer)`
  form {
    max-width: 500px;
    margin: 10px auto;
  }
`
