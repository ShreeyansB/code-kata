import { useState } from "react"
import { Button, FormControl, FormLabel, HStack, Input, Select, VStack, useToast } from '@chakra-ui/react'
import api from "../service/api";
import BalanceSheet from "./BalanceSheet";
import LoanDecision from "./LoanDecision";

function LoanForm() {

    const toast = useToast()

    const [formData, setFormData] = useState({
        name: '',
        yearEstablished: '',
        loanAmount: '',
        accountingProvider: '',
        balanceSheet: ''
    })

    const [loanDecision, setloanDecision] = useState('')

    const [isBalSheetBtnLoading, setIsBalSheetBtnLoading] = useState(false)
    const [isLoanDecisionBtnLoading, setIsLoanDecisionBtnLoading] = useState(false)
    const accProviders = ['Provider1']

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    };

    const validateBalSheetButton = () => {
        if (formData.name && formData.yearEstablished && formData.accountingProvider) return true
        else return false
    }

    const validateLoanDecisionButton = () => {
        if (
            formData.name && formData.yearEstablished && formData.accountingProvider
            && formData.balanceSheet && formData.loanAmount
        ) return true
        else return false
    }

    const handleBalSheetSubmit = async (event) => {
        event.preventDefault();
        if (validateBalSheetButton()) {
            setIsBalSheetBtnLoading(true)
            const response = await api.getBalanceSheet({ name: formData.name, yearEstablished: formData.yearEstablished, accountingProvider: formData.accountingProvider })

            if (response.error) {
                showErrorToast(response.error)
                setFormData(prevState => {
                    return {
                        ...prevState,
                        balanceSheet: ''
                    }
                })
            } else {
                setFormData(prevState => {
                    return {
                        ...prevState,
                        balanceSheet: response.data
                    }
                })
            }
            setIsBalSheetBtnLoading(false)
        }
    }

    const handleLoanDecisionSubmit = async (event) => {
        event.preventDefault();
        if (validateLoanDecisionButton()) {
            setIsLoanDecisionBtnLoading(true)
            const response = await api.getLoanDecision(formData)

            if (response.error) {
                showErrorToast(response.error)
                setloanDecision('')
            } else {
                setloanDecision(response.data)
            }
            setIsLoanDecisionBtnLoading(false)
        }
    }

    const renderSelectOptionsAccProviders = () => {
        return accProviders.map((provider) => (
            <option key={provider} value={provider}>
                {provider}
            </option>
        ));
    };

    const showErrorToast = (error) => toast({
        position: 'top',
        title: 'Error',
        description: error,
        status: 'error',
        isClosable: true,
    })

    return (
        <form>
            <VStack spacing={'0.7rem'} align={'start'}>
                <FormLabel>
                    Business Name
                    <Input placeholder="Eg: ABC Labs"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required />
                </FormLabel>

                <FormLabel>
                    Year Established
                    <Input placeholder="Eg: 2012"
                        type="number"
                        id="yearEstablished"
                        name="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={handleChange}
                        required />
                </FormLabel>

                <FormLabel>
                    Accounting Provider
                    <Select
                        placeholder='Select option'
                        id="accountingProvider"
                        name="accountingProvider"
                        value={formData.accountingProvider}
                        onChange={handleChange}
                        required
                    >
                        {renderSelectOptionsAccProviders()}
                    </Select>
                </FormLabel>

                <FormLabel>
                    Loan Amount (in INR)
                    <Input placeholder="Eg: 157000"
                        type="number"
                        id="loanAmount"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        required />
                </FormLabel>

                <BalanceSheet bal={formData.balanceSheet} />

                <LoanDecision dec={loanDecision} />

                <HStack spacing={'1rem'} wrap={"wrap"} marginTop={'1rem'}>
                    <Button
                        type="button"
                        colorScheme="facebook"
                        onClick={handleBalSheetSubmit}
                        isLoading={isBalSheetBtnLoading}
                    >
                        Get Balance Sheet
                    </Button>
                    {formData.balanceSheet && <Button
                        type="button"
                        colorScheme="green"
                        onClick={handleLoanDecisionSubmit}
                        isLoading={isLoanDecisionBtnLoading}
                    >
                        Get Loan Decision
                    </Button>}
                </HStack>
            </VStack>
        </form>
    )
}


export default LoanForm