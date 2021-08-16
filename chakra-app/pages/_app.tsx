import '@aws-amplify/ui-react/styles.css';
import { ChakraProvider } from '@chakra-ui/react';

import './css/style.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />{' '}
    </ChakraProvider>
  );
}
export default MyApp;
