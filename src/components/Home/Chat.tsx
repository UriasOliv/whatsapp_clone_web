import { TabPanel, TabPanels, VStack, Text } from "@chakra-ui/react";
import { useContext } from "react";

import { FriendContext } from './Home'

export default function Chat() {
    const { friendList } = useContext(FriendContext)

    function renderNofriends() {
        return (
            <VStack
                justify='center'
                pt='5rem'
                w='100%'
                textAlign='center'
                fontSize='lg'
            >
                <TabPanels>
                    <Text>Você ainda não possue amigos</Text>
                </TabPanels>
            </VStack>
        )
    }

    function renderfriends() {
        return (
            <VStack>
                <TabPanels>
                    <TabPanel>Amigo 1</TabPanel>
                    <TabPanel>Amigo 2</TabPanel>
                </TabPanels>
            </VStack>
        )
    }

    return friendList.length === 0 ? renderNofriends() : renderfriends()
}