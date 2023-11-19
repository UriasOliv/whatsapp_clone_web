import { useEffect, useContext } from 'react'
import socket from '../../socket'
import { AccountContext } from '../AccountContext'

export default function useSocketSetup() {
    const { setUser } = useContext(AccountContext)

    useEffect(() => {
        socket.connect()
        socket.on('connect_error', () => {
            setUser({ loggedIn: false })
        })

        return () => {
            socket.off('connect_error')
        }
    }, [setUser])
}