import axiosService, { handleError } from './axiosCreate'

type AuthType = {
    username: string,
    password: string,
}

const prefix = '/autenticate'

class Login {
    async authenticate(data: AuthType) {
        try {
            return await axiosService.post(`${prefix}/login`, data)
        } catch (error) {
            handleError(error)
        }
    }

    async signUp(data: AuthType) {
        try {
            return await axiosService.post(`${prefix}/register`, data)
        } catch (error) {
            handleError(error)
        }
    }
}

export default new Login()