import io from 'socket.io-client'

const socket = io('http://localhost', {
    autoConnect: false,
    withCredentials: true,
})

export default socket