import { useEffect, useContext } from 'react'
import socket from '../../socket'
import { AccountContext } from '../AccountContext'
import { FriendContext } from './Home'


export default function useSocketSetup() {
    const { setUser } = useContext(AccountContext)
    const { setFriendList } = useContext(FriendContext)

    useEffect(() => {
        socket.connect()
        socket.on('connect_error', () => {
            setUser({ loggedIn: false })
        })

        socket.on('connected', (status: boolean, userName: string) => {
            setFriendList(previousFriendList => {
                return previousFriendList.map(friend => {
                    if(friend.username === userName){
                        friend.connected = status
                    }

                    return friend
                })
            })
        })

        return () => {
            socket.off('connect_error')
        }
    }, [setFriendList, setUser])
}