import { AxiosResponse } from 'axios';
import axiosService, { handleError } from './axiosCreate'
import { FriendProps } from '../components/Home/Home';

const prefix = '/auth/user'

class UserService {
    async addFriend(friendName: string) {
        try {
            const response: AxiosResponse = await axiosService.post(`${prefix}/friend`, { friendName })
            return response.data
        } catch (error) {
            throw handleError(error)
        }
    }
    async getFriends(): Promise<FriendProps[]> {
        try {
            const response: AxiosResponse = await axiosService.get(`${prefix}/friend`)
            return response.data
        } catch (error) {
            throw handleError(error)
        }
    }
}

export default new UserService()