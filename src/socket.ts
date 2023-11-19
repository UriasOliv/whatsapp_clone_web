import io from 'socket.io-client'

const socket = io('http://localhost', {
    autoConnect: true,
    withCredentials: true,
})

export default socket