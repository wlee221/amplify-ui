import { MapView, LocationSearch } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function BasicMap() {
  const unusedVar = '';
  return <MapView />;
}
