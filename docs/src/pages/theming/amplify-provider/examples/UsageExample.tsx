import { AmplifyProvider } from '@aws-amplify/ui-react';
import { MyApp } from './MyApp';

export const UsageExample = () => {
  return (
    <AmplifyProvider>
      <MyApp />
    </AmplifyProvider>
  );
};
