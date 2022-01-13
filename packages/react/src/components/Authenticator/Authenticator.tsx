import * as React from 'react';

import { Provider, ProviderProps } from './Provider';
import { AuthenticatorContext } from './Provider/context';
import { ResetPassword } from './ResetPassword';
import { Router, RouterProps } from './Router';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export type AuthenticatorProps = ProviderProps & RouterProps;

export function Authenticator({
  children,
  className,
  components,
  initialState,
  loginMechanisms,
  services,
  signUpAttributes,
  socialProviders,
  variation,
}: AuthenticatorProps) {
  const { serviceHasStarted } = React.useContext(AuthenticatorContext);
  const duplicateProviderExists = serviceHasStarted !== undefined;

  const ContextConsumer = ({ children }) => {
    const { passAuthContext, serviceHasStarted } =
      React.useContext(AuthenticatorContext);

    React.useEffect(() => {
      console.log(serviceHasStarted, passAuthContext);
      if (serviceHasStarted == false && passAuthContext) {
        passAuthContext({
          components,
          initialState,
          loginMechanisms,
          services,
          signUpAttributes,
          socialProviders,
        });
      }
    }, []);

    return (
      <Router className={className} children={children} variation={variation} />
    );
  };

  if (duplicateProviderExists) {
    return <ContextConsumer children={children} />;
  } else {
    return (
      <Provider>
        <ContextConsumer children={children} />
      </Provider>
    );
  }
}

Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
