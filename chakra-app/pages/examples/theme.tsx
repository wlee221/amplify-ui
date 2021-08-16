import React from 'react';
import { View, Flex } from '@aws-amplify/ui-react';
import { Box, useTheme } from '@chakra-ui/react';

const App = () => {
  const theme = useTheme();
  return (
    <Flex>
      <Box bg="orange.100">Chakra Box</Box>
      <View backgroundColor={theme.colors.orange[100]}>Amplify View</View>
    </Flex>
  );
};

export default App;
