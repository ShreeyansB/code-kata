import { Box, Text } from "@chakra-ui/react"

function Header() {
    return (
        <Box >
            <Text fontSize={{base: '2xl', md: '3xl'}} color='blue.600' as='b'>📄 Demyst Assessment</Text>
            <hr />
        </Box>
    )
}

export default Header