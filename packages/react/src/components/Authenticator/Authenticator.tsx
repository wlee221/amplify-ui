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
  const { passAuthContext } = React.useContext(AuthenticatorContext);
  const duplicateProviderExists = !!passAuthContext;
  console.log(
    duplicateProviderExists
      ? 'duplicate provider exists'
      : 'no provider is above authenticator'
  );

  const RouterWrapper = ({ children }) => {
    const { passAuthContext, hasAuthContext } =
      React.useContext(AuthenticatorContext);
    React.useEffect(() => {
      if (passAuthContext && !hasAuthContext) {
        passAuthContext({
          components,
          initialState,
          loginMechanisms,
          services,
          signUpAttributes,
          socialProviders,
        });
      }
    });

    return (
      <Router className={className} children={children} variation={variation} />
    );
  };

  return (
    <Provider>
      <RouterWrapper>{children}</RouterWrapper>
    </Provider>
  );
}

Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
