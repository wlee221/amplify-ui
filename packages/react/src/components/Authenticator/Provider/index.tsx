import { createAuthenticatorMachine, getServiceFacade } from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';

import {
  AuthenticatorContext,
  AuthenticatorProps,
  ProviderProps,
} from './context';
import { defaultComponents } from './defaultComponents';

export const Provider = ({ children }) => {
  const [providerProps, setProviderProps] =
    React.useState<AuthenticatorProps>();
  const [hasAuthContext, setHasAuthContext] = React.useState<boolean>(false);

  const passAuthContext = (authContext: AuthenticatorProps) => {
    setProviderProps({ ...authContext });
    setHasAuthContext(true);
  };

  const providerValue: ProviderProps = {
    ...providerProps,
    hasAuthContext,
    passAuthContext,
  };

  return (
    <AuthenticatorContext.Provider value={providerValue}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

export const useAuthenticator = () => {
  const context = React.useContext(AuthenticatorContext);
  const { hasAuthContext, ...machineProps } = context;
  if (!hasAuthContext) return; // Provider hasn't been passed required props yet

  const [state, send] = useMachine(
    () => createAuthenticatorMachine(machineProps),
    {
      devTools: process.env.NODE_ENV === 'development',
    }
  );

  console.log('in useAuthenticator', state.value);
  const components = React.useMemo(
    () => ({ ...defaultComponents, ...context.components }),
    [context.components]
  );

  const facade = React.useMemo(
    () => getServiceFacade({ send, state }),
    [send, state]
  );

  return {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    components,
    ...facade,
  };
};

export { ProviderProps };
