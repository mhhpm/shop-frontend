import Layout from '@utils/components/Layout'
import LoadingButton from '@utils/components/LoadingButton'
import { register } from '@utils/services/register'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import { Form, Row, Stack } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { LoginContainer } from './login'

const Register = () => {
  const { query, push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { data: session } = useSession()
  if (session) {
    push('/')
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (confirmPassword !== password) {
      toast.error('Mật khẩu xác nhận không đúng.')
      return
    }
    setIsLoading(true)
    try {
      await register({ email, password, name })
      toast.success('Đăng ký tài khoản thành công.')
      signIn('login', {
        callbackUrl: (query.callbackUrl as string) || '/',
        email,
        password,
      })
    } catch (error: any) {
      if (error?.response?.data) {
        const {
          error: { status },
        } = error.response.data
        if (status === 400) {
          toast.error('Email đã được sử dụng.')
          return
        }
        toast.error('Đăng ký không thành công.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout title="Book Shop | Đăng ký">
      <div className="d-flex align-items-center h-100">
        <LoginContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
          <Stack>
            <Row className="text-center mb-1 text-dark">
              <h2>Đăng ký</h2>
            </Row>
            <Row>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Họ tên</Form.Label>
                  <Form.Control
                    placeholder="Nguyen Van A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <LoadingButton
                    variant="warning"
                    type="submit"
                    className="w-100 mt-3 mb-2"
                    isLoading={isLoading}
                  >
                    Đăng ký
                  </LoadingButton>
                </Form.Group>
                <Form.Group className="mt-3 text-center">
                  Đã có tài khoản?
                  <Link href="/auth/login">
                    <a className="text-secondary"> Đăng nhập</a>
                  </Link>
                </Form.Group>
              </Form>
            </Row>
          </Stack>
        </LoginContainer>
      </div>
    </Layout>
  )
}

export default Register
