import { MyApp } from './MyApp';
import { AmplifyProvider, Theme, useTheme } from '@aws-amplify/ui-react';

const darkTheme: Theme = {
  name: 'dark',
  tokens: {
    colors: {
      brand: {
        secondary: {
          100: { value: 'darkred' },
        },
      },
      neutral: {
        10: { value: 'hsl(210, 50%, 10%)' },
        20: { value: 'hsl(210, 25%, 25%)' },
        40: { value: 'hsl(210, 10%, 40%)' },
        60: { value: 'hsl(210, 6%, 70%)' },
        80: { value: 'hsl(210, 5%, 87%)' },
        90: { value: 'hsl(210, 5%, 94%)' },
        100: { value: 'hsl(210, 5%, 98%)' },
      },
      black: { value: '#fff' },
      white: { value: '#000' },

      border: {
        primary: { value: '{colors.neutral.20}' },
        secondary: { value: '{colors.neutral.20}' },
        tertiary: { value: '{colors.neutral.20}' },
      },

      overlay: {
        10: { value: 'hsla(0, 0%, 100%, 0.1)' },
        20: { value: 'hsla(0, 0%, 100%, 0.2)' },
        30: { value: 'hsla(0, 0%, 100%, 0.3)' },
        40: { value: 'hsla(0, 0%, 100%, 0.4)' },
        50: { value: 'hsla(0, 0%, 100%, 0.5)' },
        60: { value: 'hsla(0, 0%, 100%, 0.6)' },
        70: { value: 'hsla(0, 0%, 100%, 0.7)' },
        80: { value: 'hsla(0, 0%, 100%, 0.8)' },
        90: { value: 'hsla(0, 0%, 100%, 0.9)' },
      },
    },
  },
};

const ThemedCustomButton = () => {
  const { tokens } = useTheme();
  //with the useTheme hook you can use the declared theme tokens directly in your own custom components
  const customButtonStyles = {
    borderWidth: tokens.components.button.primary.borderWidth.value,
    backgroundColor: tokens.components.button.primary.backgroundColor.value,
    borderColor: tokens.colors.border.primary.value,
    color: tokens.colors.brand.secondary[100].value,
    borderRadius: tokens.components.button.borderRadius.value,
  };
  return <button style={customButtonStyles}>Custom Button</button>;
};

const StyledCustomButton = () => {
  //your custom theme can also be shared through the declared css variables and used in your custom class styling
  return <button className="styled-custom-button">Styled Button</button>;
};

export const ThemeExample = () => {
  return (
    <AmplifyProvider theme={darkTheme}>
      <MyApp>
        <div>
          <ThemedCustomButton />
          <StyledCustomButton />
        </div>
      </MyApp>
    </AmplifyProvider>
  );
};
