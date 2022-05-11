import { MyApp } from './MyApp';
import { AmplifyProvider } from '@aws-amplify/ui-react';

export const ThemeExample = () => {
  return (
    <AmplifyProvider>
      <MyApp />
    </AmplifyProvider>
  );
};
