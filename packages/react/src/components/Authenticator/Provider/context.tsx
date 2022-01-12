import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import * as React from 'react';

import type { PartialDeep } from '../../../types';
import { defaultComponents } from './defaultComponents';

export type AuthenticatorProps = AuthenticatorMachineOptions & {
  components?: PartialDeep<typeof defaultComponents>;
  services?: AuthenticatorMachineOptions['services'];
};

export type ProviderProps = AuthenticatorProps & {
  passAuthContext?: (props: AuthenticatorProps) => void;
  hasAuthContext?: boolean;
};

export const AuthenticatorContext: React.Context<ProviderProps> =
  React.createContext({});
