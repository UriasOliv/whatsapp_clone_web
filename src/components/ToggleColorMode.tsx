import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function ToggleColorMode() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button
        pos="absolute"
        top="0"
        right="0"
        onClick={() => toggleColorMode()}>
            {colorMode === 'dark'? <MoonIcon color="blue.700" /> : <SunIcon color="orange.400" /> }
        </Button>
    )
}