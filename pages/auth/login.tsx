import Layout from '@utils/components/Layout'
import LoadingButton from '@utils/components/LoadingButton'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useState } from 'react'
import { Container, Form, Row, Stack } from 'react-bootstrap'
import toast from 'react-hot-toast'
import styled from 'styled-components'

const LoginContainer = styled(Container)`
  max-width: 480px;
  @media (max-width: 500px) {
    max-width: 95%;
  }
`

const Login = () => {
  const { query, push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      push('/')
    }
  })

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    signIn('login', {
      callbackUrl: (query.callbackUrl as string) || '/',
      email,
      password,
    })
  }

  useEffect(() => {
    if (!('error' in query)) return
    toast.error(
      'Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.',
    )
  }, [query])

  return (
    <Layout title="Book Shop | Login">
      <div className="d-flex align-items-center h-100">
        <LoginContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
          <Stack>
            <Row className="text-center mb-1 text-dark">
              <h2>Đăng nhập</h2>
            </Row>
            <Row>
              <Form onSubmit={handleLogin}>
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Input your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Đăng nhập
                  </LoadingButton>
                </Form.Group>
                <Form.Group className="mt-3 text-center">
                  Chưa có tài khoản?
                  <Link href="/register">
                    <a className="text-secondary"> Hãy đăng ký</a>
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

export default Login
