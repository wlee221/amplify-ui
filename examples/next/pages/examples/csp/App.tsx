import {
  Text,
  useTheme,
  Heading,
  AmplifyProvider,
  Card,
  Theme,
} from '@aws-amplify/ui-react';

const myTheme: Theme = {
  name: 'myTheme',
  tokens: {
    components: {
      card: {
        borderColor: 'pink',
      },
    },
  },
};
Object.freeze(myTheme);

export const App = () => (
  <AmplifyProvider theme={myTheme} nonce="fakeNonce">
    <Card>
      <Heading>CSP example</Heading>
      <Text>
        This is an example of using CSP strict mode using the ThemeProvider
      </Text>
    </Card>
  </AmplifyProvider>
);
