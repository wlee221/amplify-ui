import React from 'react';

import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  View,
} from '@aws-amplify/ui-react';
import {
  ChakraProvider,
  Box,
  Button as ChakraButton,
  Badge as ChakraBadge,
} from '@chakra-ui/react';

const App = () => {
  return (
    <Box>
      <View>
        <Flex justifyContent="center">
          <Heading color="blue" level={3}>
            Hello, Amplify and Chakra UI!
          </Heading>
        </Flex>
      </View>
      <Flex justifyContent="flex-start">
        <Card id="mix-button">
          <Flex>
            <Button>Amplify Button</Button>
            <ChakraButton colorScheme="blue">Chakra Button</ChakraButton>
          </Flex>
        </Card>
        <Card id="mix-badge">
          <Flex>
            <Badge variation="warning">Amplify Badge</Badge>
            <ChakraBadge colorScheme="green">Chakra Badge</ChakraBadge>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
};

export default App;
