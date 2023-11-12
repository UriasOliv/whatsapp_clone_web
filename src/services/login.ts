import { AxiosResponse } from 'axios';
import axiosService, { handleError } from './axiosCreate'

type AuthType = {
    username: string,
    password: string,
}

const prefix = '/autenticate'

type AuthenticateReturn = {
    loggedIn: boolean;
    username: string;
}

class Login {
    async authenticate(data: AuthType) {
        try {
            // eslint-disable-next-line no-debugger
            debugger
            const response: AxiosResponse<AuthenticateReturn> = await axiosService.post(`${prefix}/login`, data)
            return response.data
        } catch (error) {
            throw handleError(error)
        }
    }

    async checkToken() {
        try {
            const response: AxiosResponse<AuthenticateReturn> = await axiosService.get(`${prefix}/login`)
            return response.data
        } catch (error) {
            throw handleError(error)
        }
    }

    async signUp(data: AuthType) {
        try {
            const response: AxiosResponse<AuthenticateReturn> = await axiosService.post(`${prefix}/register`, data)
            return response.data
        } catch (error) {
            throw handleError(error)
        }
    }
}

export default new Login()