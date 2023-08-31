import { Box, Code, Text, VStack } from "@chakra-ui/react"

function BalanceSheet(props) {

    const renderBalanceSheet = () => {
        return props.bal.map((item, index) =>
            <Code key={index}>{JSON.stringify(item)}</Code>
        )
    }

    return (
        <>
            {props.bal &&
                <Box>

                    <Text fontWeight={'semibold'}>Balance Sheet</Text>
                    <VStack spacing={'0.2rem'} align={'start'} width={{ base: '80vw', md: 'auto' }} overflowX={'auto'}>
                        {renderBalanceSheet()}
                    </VStack>
                </Box>}
        </>
    )
}

export default BalanceSheet