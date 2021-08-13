import React from 'react';

import { View } from '@aws-amplify/ui-react';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>
      <View>Hello, world!</View>
    </ChakraProvider>
  );
};

export default App;
