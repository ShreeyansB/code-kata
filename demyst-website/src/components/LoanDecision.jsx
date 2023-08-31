import { VStack, Text, Code } from "@chakra-ui/react"

function LoanDecision(props) {
    const renderLoanDecision = () => {
        return Object.entries(props.dec).map(([key, value]) => <Code key={key}>{key}: {value.toString()}</Code>)
    }

    return (
        <>
            {props.dec && <VStack spacing={'0.2rem'} align={'start'}>
                <Text fontWeight={'semibold'}>Loan Decision</Text>
                {renderLoanDecision()}
            </VStack>}
        </>
    )
}

export default LoanDecision