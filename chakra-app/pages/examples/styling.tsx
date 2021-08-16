import React from 'react';
import { View, Text } from '@aws-amplify/ui-react';
import { Box, Text as ChakraText } from '@chakra-ui/react';

const App = () => {
  return (
    <>
      <View>
        <Text className="my-custom-css">Hello, Amplify UI!</Text>
      </View>
      <Box>
        <ChakraText className="my-custom-css">Hello, Chakra UI!</ChakraText>
      </Box>
    </>
  );
};

export default App;
