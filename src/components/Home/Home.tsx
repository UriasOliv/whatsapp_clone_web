import { createContext, useState } from 'react'
import { Grid, GridItem, Tabs } from '@chakra-ui/react'

import Sidebar from './Sidebar'
import Chat from './Chat'
import useSocketSetup from './useSocketSetup'

interface FriendProps {
    username: string,
    connected: boolean,
}

interface FriendContextProps {
    friendList: FriendProps[],
    setFriendList: (value: FriendProps[]) => void,
}

export const FriendContext = createContext<FriendContextProps>({
    friendList: [],
    setFriendList: () => {}
})

export default function Home() {
    const [friendList, setFriendList] = useState<FriendProps[]>([])
    useSocketSetup()
    return (
        <FriendContext.Provider value={{ friendList, setFriendList}}>
            <Grid templateColumns="repeat(10, 1fr)" h='100vh' as={Tabs}>
                <GridItem colSpan={3} borderRight="1px solid gray">
                    <Sidebar />
                </GridItem>
                <GridItem colSpan={7}>
                    <Chat />
                </GridItem>
            </Grid>
        </FriendContext.Provider>
    )
}