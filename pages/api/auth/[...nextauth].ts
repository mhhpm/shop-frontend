import { asyncTryCatch } from '@utils/libs/functionalTryCatch'
import axios from 'axios'
import { API } from 'environment'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialProviders from 'next-auth/providers/credentials'

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
            .post(`${API}/auth/local`, {
              identifier: credentials?.email,
              password: credentials?.password,
            })
            .then((res) => res.data)
            .then((data) => {
              const { jwt, user } = data
              return {
                token: jwt,
                ...user,
              }
            }),
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
        token.accessToken = user.token as JWT
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  events: {},
  debug: false,
})
