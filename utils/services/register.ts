import { IUser } from '@utils/types/user'
import axios from 'axios'
import { API } from 'environment'

export const register = async (params: {
  email: string
  password: string
  name: string
}) => {
  const { data } = await axios.post<IUser>(API + '/auth/local/register', {
    ...params,
  })
  return data
}
