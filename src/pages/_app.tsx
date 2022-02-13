import { Box, ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

export default function NextApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box bg="gray.800" w="100%" minH="100vh" p={4} color="gray.100">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
