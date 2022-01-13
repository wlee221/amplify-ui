import { createAuthenticatorMachine, getServiceFacade } from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';

import {
  AuthenticatorContext,
  AuthenticatorProps,
  ProviderProps,
  useComputeContextValue,
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
    serviceHasStarted: true,
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

  if (hasAuthContext) {
    return (
      <MachineProvider providerProps={providerProps}>
        {children}
      </MachineProvider>
    );
  } else {
    const providerValue = {
      passAuthContext,
      serviceHasStarted: false,
    };
    return (
      <AuthenticatorContext.Provider value={providerValue}>
        {children}
      </AuthenticatorContext.Provider>
    );
  }
};

const useAuthenticatorDefault = {
  route: 'idle',
  components: defaultComponents,
};

export const useAuthenticator = (): Partial<
  ReturnType<typeof useComputeContextValue>
> => {
  const context = React.useContext(AuthenticatorContext);
  const { passAuthContext, serviceHasStarted, ...machineProps } = context;
  const machineHasStarted = !!machineProps._state;
  return machineHasStarted ? machineProps : useAuthenticatorDefault;
};

export { ProviderProps };
