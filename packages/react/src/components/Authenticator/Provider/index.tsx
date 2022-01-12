import { createAuthenticatorMachine, getServiceFacade } from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';

import {
  AuthenticatorContext,
  AuthenticatorContextValue,
  AuthenticatorProps,
  ProviderProps,
} from './context';
import { defaultComponents } from './defaultComponents';

// only initialized after machine is created, so
const MachineProvider = ({ providerProps, children }) => {
  const { components: customComponents, ...machineProps } = providerProps;

  const [state, send] = useMachine(
    () => createAuthenticatorMachine(machineProps),
    {
      devTools: process.env.NODE_ENV === 'development',
    }
  );

  const components = React.useMemo(
    () => ({ ...defaultComponents, ...customComponents }),
    [customComponents]
  );

  const facade = React.useMemo(
    () => getServiceFacade({ send, state }),
    [send, state]
  );

  const providerValue = {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    components,
    ...facade,
  };

  return (
    <AuthenticatorContext.Provider value={providerValue}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

export const Provider = ({ children }) => {
  const [providerProps, setProviderProps] =
    React.useState<AuthenticatorProps>();
  const [hasAuthContext, setHasAuthContext] = React.useState<boolean>(false);

  const passAuthContext = (authContext: AuthenticatorProps) => {
    setProviderProps({ ...authContext });
    setHasAuthContext(true);
  };

  const providerValue = {
    passAuthContext,
  };

  return hasAuthContext ? (
    <MachineProvider providerProps={providerProps}>{children}</MachineProvider>
  ) : (
    <AuthenticatorContext.Provider value={providerValue}>
      {children}
    </AuthenticatorContext.Provider>
  );
};

const useAuthenticatorDefault = {
  route: 'idle',
  components: defaultComponents,
};

export const useAuthenticator = (): Omit<
  AuthenticatorContextValue,
  'hasAuthContext' | 'passAuthContext'
> => {
  const context = React.useContext(AuthenticatorContext);
  const { passAuthContext, ...machineProps } = context;
  return { ...useAuthenticatorDefault, ...machineProps };
};

export { ProviderProps };
