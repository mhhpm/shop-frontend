import axios from 'axios'
import { API } from 'environment'
import { IUser } from '@utils/types/user'

export const getUser = async (id: any) => {
  const user = await axios.get<IUser>(API + `/users/${id}`)
  return user.data
}
