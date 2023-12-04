import { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import { Grid, GridItem, Tabs } from '@chakra-ui/react'
import userService from '../../services/user'

import Sidebar from './Sidebar'
import Chat from './Chat'
import useSocketSetup from './useSocketSetup'

type FriendProviderType = {
    children: ReactNode
}

export interface FriendProps {
    username: string,
    connected: boolean,
}

interface FriendContextProps {
    friendList: FriendProps[],
    setFriendList: React.Dispatch<React.SetStateAction<FriendProps[]>>,
}

export const FriendContext = createContext({} as FriendContextProps)

export function FriendProvider({children}: FriendProviderType) {
    const [friendList, setFriendList] = useState<FriendProps[]>([])

    useEffect(() => {
        userService.getFriends().then(r => {
            setFriendList(r)
        }).catch(error => {
            console.error(error)
        })
    }, [])

    return (
        <FriendContext.Provider value={{ friendList, setFriendList}}>
            {children}
        </FriendContext.Provider>
    )
}

function HomePage() {
    useSocketSetup()
    const { friendList } = useContext(FriendContext)
    console.log(friendList)
    return (
        <Grid templateColumns="repeat(10, 1fr)" h='100vh' as={Tabs}>
            <GridItem colSpan={3} borderRight="1px solid gray">
                <Sidebar />
            </GridItem>
            <GridItem colSpan={7}>
                <Chat />
            </GridItem>
        </Grid>
    )
}

export default function Home() {
    return (
        <FriendProvider>
            <HomePage />
        </FriendProvider>
    )
}