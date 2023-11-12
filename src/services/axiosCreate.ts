import axios, { AxiosError } from 'axios'

const axiosCreate = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
})

const token = "token"

axiosCreate.interceptors.request.use((config) => {
    config.headers.Authorization = token
    return config
})

export function handleError(error: unknown) {
    if(error instanceof AxiosError) {
        return error.response?.data.message
    }    
}

export default axiosCreate