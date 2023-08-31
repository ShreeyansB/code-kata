import Header from './components/Header'
import { Box } from '@chakra-ui/react'
import Submit from './pages/Submit'

function App() {

  return (
    <Box
      marginTop={'1rem'}
      marginX={{ base: '1rem', sm: '2rem', md: '10rem', lg: '15rem' }}>
      <Header />
      <Submit />
    </Box>
  )
}

export default App
