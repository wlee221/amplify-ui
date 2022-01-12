import {
  AuthenticatorMachineOptions,
  createAuthenticatorMachine,
  getServiceFacade,
} from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import * as React from 'react';

import type { PartialDeep } from '../../../types';
import { defaultComponents } from './defaultComponents';

export type AuthenticatorProps = AuthenticatorMachineOptions & {
  components?: PartialDeep<typeof defaultComponents>;
  services?: AuthenticatorMachineOptions['services'];
};

export type ProviderProps = AuthenticatorProps & {
  passAuthContext?: (props: AuthenticatorProps) => void;
};

export const useComputeContextValue = (providerProps: ProviderProps) => {
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

  return {
    /** @deprecated For internal use only */
    _send: send,
    /** @deprecated For internal use only */
    _state: state,
    components,
    ...facade,
  };
};

export type AuthenticatorContextValue = Partial<
  ReturnType<typeof useComputeContextValue>
> & {
  passAuthContext?: (props: AuthenticatorProps) => void;
};

export const AuthenticatorContext: React.Context<AuthenticatorContextValue> =
  React.createContext({});
