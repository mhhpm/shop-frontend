import { IUser } from '@utils/types/user'
import axios from 'axios'
import { API } from 'environment'

export const forgetPassword = async (id: string, username: string) => {
  const data = await axios.put<any>(API + `/users/${id}`, {
    username,
  })
  return data
}
