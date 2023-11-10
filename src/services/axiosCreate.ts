import axios, { AxiosError } from 'axios'

const axiosCreate = axios.create({
    baseURL: 'http://localhost'
})

const token = "token"

axiosCreate.interceptors.request.use((config) => {
    config.headers.Authorization = token
    return config
})

export function handleError(error: unknown) {
    const erro =  error as AxiosError
    console.log(erro.response?.data)
}

export default axiosCreate