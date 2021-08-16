import React from 'react';

import { View, Badge, Button, Card, Flex, Text } from '@aws-amplify/ui-react';
import { useBoolean, useMediaQuery } from '@chakra-ui/react';

const App = () => {
  const [flag, setFlag] = useBoolean();
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  return (
    <View>
      <Flex>
        <Card>
          <Flex direction="column">
            {flag ? <Badge variation="success">success</Badge> : null}
            <Button onClick={setFlag.toggle}>useBoolean</Button>
          </Flex>
        </Card>
        <Card>
          <Text>
            {isLargerThan1280 ? 'larger than 1280px' : 'smaller than 1280px'}
          </Text>
        </Card>
      </Flex>
    </View>
  );
};

export default App;
