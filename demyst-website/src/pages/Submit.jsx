import { Box, Heading, useToast } from "@chakra-ui/react"
import LoanForm from "../components/LoanForm"
import api from "../service/api"
import { useEffect } from "react"

function Submit() {

    const toast = useToast()

    const showErrorToast = (error) => toast({
        position: 'top',
        title: 'Backend Initialization',
        description: error,
        status: 'error',
        isClosable: true,
    })

    const showSuccessToast = (response) => toast({
        position: 'top',
        title: 'Backend Initialization',
        description: response,
        status: 'success',
        isClosable: true,
    })


    useEffect(() => {
        (async () => {
            const response = await api.getInit()
            if (response.error) showErrorToast(response.error)
            else showSuccessToast(response)
        })()
    }, [])

    return (
        <Box paddingY={'3rem'} >
            <Heading fontSize={'2xl'} marginBottom={'1.4rem'}>
                Apply for Loan
            </Heading>
            <LoanForm />
        </Box >
    )
}

export default Submit