import { useState } from 'react';
import { Amplify } from '@aws-amplify/core';
import { Auth, ShugoProvider, USER_PARAM_TYPE } from '@aws-amplify/auth';

import {
  Authenticator,
  Radio,
  RadioGroupField,
  Flex,
  Heading,
  useTheme,
  View,
  Button,
  useAuthenticator,
} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import './shugo-poc.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

const API_HOST = '29k9fdk5lh.execute-api.us-west-2.amazonaws.com';

const shugoPlugin = new ShugoProvider();
Amplify.addPluggable(shugoPlugin);

shugoPlugin.configure({
  api_host: API_HOST,
  redirectSignIn: 'http://localhost:3000/ui/components/authenticator/shugo',
});

export default function App() {
  const radioOptions = ['Magic link', 'Social', 'Web AuthN'];
  const defaultValues = {
    phone: '6024108498',
    username: 'nicaroch@amazon.com',
  };
  const [signInMethod, setSignInMethod] = useState(radioOptions[0]);

  const handleRadioSelection = (e: any) => {
    const selection = e.target.value;
    setSignInMethod(selection);
  };

  const handleAddAuthenticator = async () => {
    // configure a DEVICE for account
    await Auth.addAuthenticator();
  };

  const populateFieldWithDefault = () => {
    const input = document.querySelector('input[name="username"]');
    const value =
      signInMethod === 'Magic link'
        ? defaultValues.phone
        : defaultValues.username;
    input.setAttribute('value', value);
  };

  const services = {
    async handleSignIn(data) {
      console.log(`sign in with ${signInMethod}`, { data });
      switch (signInMethod) {
        case 'Magic link':
          console.log('magic link...');
          return Auth.signIn({
            link: { method: USER_PARAM_TYPE.PHONE, value: data.username },
          });
        case 'Social':
          console.log('Social');
        // TODO
        // return Auth.signIn({
        //   social: { provider: 'facebook' },
        // });
        case 'Web AuthN':
          console.log('Web AuthN');
          return Auth.signIn({
            webauthn: {
              identifierType: USER_PARAM_TYPE.EMAIL,
              identifierValue: data.username,
            },
          });
        default:
          console.log('default... should do nothing.');
      }
    },
    // async handleConfirmSignIn(data) {
    //   console.log('custom confirm sign in!!!!');
    // },
  };

  const formFields = {
    signIn: {
      password: {
        labelHidden: true,
        placeholder: 'Password (not required for Shugo)',
        isRequired: false,
      },
    },
  };

  const components = {
    SignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <View textAlign="center">
            <Heading
              padding={`${tokens.space.xl} 0 0 ${tokens.space.small}`}
              level={5}
            >
              Sign In with {signInMethod}
            </Heading>
          </View>
        );
      },
      Footer() {
        const { tokens } = useTheme();
        const { toResetPassword } = useAuthenticator();
        return (
          <View textAlign="center">
            <Button
              marginBottom={`${tokens.space.medium}`}
              fontWeight="normal"
              onClick={populateFieldWithDefault}
              size="small"
              variation="link"
            >
              {`Feelin' lazy? Populate the input with a default value.`}
            </Button>
          </View>
        );
      },
    },
  };

  return (
    <Flex direction="column" alignItems="center">
      <RadioGroupField
        label="Sign In Method:"
        name="shugo-sign-in-options"
        defaultValue={radioOptions[0]}
        direction="row"
      >
        {radioOptions.map((option) => (
          <Radio key={option} value={option} onChange={handleRadioSelection}>
            {option}
          </Radio>
        ))}
      </RadioGroupField>
      {signInMethod === 'Magic link' && (
        <Authenticator
          loginMechanisms={['phone_number']}
          services={services}
          formFields={formFields}
          socialProviders={[]}
          hideSignUp={true}
          components={components}
        >
          {({ signOut, user }) => {
            // console.log({ user });
            return (
              <main>
                <h1>Signed in!</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            );
          }}
        </Authenticator>
      )}
      {signInMethod === 'Social' && (
        <Authenticator
          signUpAttributes={[]}
          services={services}
          formFields={formFields}
          socialProviders={['facebook', 'google']}
          hideSignUp={true}
          components={components}
        >
          {({ signOut, user }) => {
            // console.log({ user });
            return (
              <main>
                <h1>Signed in!</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            );
          }}
        </Authenticator>
      )}
      {signInMethod === 'Web AuthN' && (
        <Authenticator
          loginMechanisms={['email']}
          services={services}
          formFields={formFields}
          socialProviders={[]}
          hideSignUp={true}
          components={components}
        >
          {({ signOut, user }) => {
            // console.log({ user });
            return (
              <main>
                <h1>Signed in!</h1>
                <button onClick={signOut}>Sign out</button>
                <button onClick={handleAddAuthenticator}>
                  Add Authenticator Device
                </button>
              </main>
            );
          }}
        </Authenticator>
      )}
    </Flex>
  );
}
