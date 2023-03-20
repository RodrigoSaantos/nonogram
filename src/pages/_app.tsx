import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { ControlProvider } from '@/hooks/useControl'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ControlProvider>
        <Component {...pageProps} />
      </ControlProvider>
    </ChakraProvider>
  )

}
