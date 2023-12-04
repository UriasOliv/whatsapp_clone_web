import { useContext, useEffect } from 'react'
import { FriendContext } from './Home'
import { ChatIcon } from '@chakra-ui/icons'
import { Button, Divider, HStack, Heading, Text,Tab, TabList, VStack, Circle, useDisclosure } from '@chakra-ui/react'
import AddFriendModal from '../AddFriendModal'
import user from '../../services/user'

export default function Sidebar() {
    const { friendList } = useContext(FriendContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack py="1.4rem">
            <HStack justify="space-evenly" w='100%'>
                <Heading size="md">Add Amigo</Heading>
                <Button onClick={onOpen}>
                    <ChatIcon />
                </Button>
            </HStack>

            <Divider />

            <VStack as={TabList}>
                {friendList.map((friend) => {
                    console.log(friend)
                    return (
                        <HStack as={Tab} key={friend.username}>
                            <Circle size='18px' bg={friend.connected? 'green.700' : 'red.500'} color='white'/>
                            <Text>{friend.username}</Text>
                        </HStack>
                    )
                })}
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    )
}