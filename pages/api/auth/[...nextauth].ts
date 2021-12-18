import jwt from 'jsonwebtoken'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialProviders from 'next-auth/providers/credentials'
import axios from 'axios'
import { asyncTryCatch } from '@utils/libs/functionalTryCatch'
import { API } from 'environment'

export default NextAuth({
  providers: [
    CredentialProviders({
      id: 'login',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'johndoe@test.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        const [res] = await asyncTryCatch(() =>
          axios
            .post(`${API}/api/auth/validate`, {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((res) => res.data),
        )
        return res
      },
    }),
  ],
  callbacks: {
    redirect: ({ url }) => {
      return url
    },
    signIn: () => {
      return true
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async (params) => {
      const secret = params?.secret || ''
      const token = params?.token || ''

      const payload = Object.assign({}, token)

      const encodedToken = jwt.sign(payload, secret, {
        algorithm: 'HS256',
      })

      return encodedToken
    },

    decode: async (params) => {
      if (!params?.token) {
        return {}
      }
      const secret = params?.secret as string
      const decodedToken = jwt.verify(params?.token, secret, {
        algorithms: ['HS256'],
      }) as JWT

      return decodedToken
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  events: {},
  debug: false,
})
