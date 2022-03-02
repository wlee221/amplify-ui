import {
  ActorContextWithForms,
  authInputAttributes,
  getActorContext,
  translate,
  isSupportedAuthField,
} from '@aws-amplify/ui';
import {
  PasswordField,
  PhoneNumberField,
  TextField,
} from '../../../primitives';
import { useAuthenticator } from '../hooks/useAuthenticator';

export interface AttributeFieldProps {
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
  label: string;
  autoComplete: string;
  labelHidden: string;
  defaultCountryCode: string;
  dialCodeList: Array<string>;
}

export function AttributeField({ name, ...passedProps }) {
  const { _state } = useAuthenticator();
  const { country_code } = getActorContext(_state) as ActorContextWithForms;

  if (!isSupportedAuthField(name)) {
    console.debug(
      `Authenticator does not have a default implementation for ${name}. Customize Authenticator.SignUp.FormFields to add your own.`
    );
    return null;
  }

  const defaultProps = authInputAttributes[name];

  // merged passed attributes with default attributes
  const props = { ...defaultProps, ...passedProps } as Record<string, any>;

  const label = translate<string>(props.label);
  const placeholder = translate<string>(props.placeholder);

  if (name === 'phone_number') {
    return (
      <PhoneNumberField
        {...props}
        autoComplete={props.autoComplete || props.autocomplete}
        label={label}
        placeholder={placeholder}
        defaultCountryCode={country_code}
        isRequired
        name="phone"
        labelHidden
      />
    );
  } else if (name === 'password') {
    return (
      <PasswordField
        {...props}
        autoComplete={props.autoComplete || props.autocomplete}
        label={label}
        placeholder={placeholder}
        isRequired
        labelHidden
        name="password"
      />
    );
  } else {
    return (
      <TextField
        {...props}
        autoComplete={props.autoComplete || props.autocomplete}
        label={label}
        placeholder={placeholder}
        isRequired
        labelHidden
      />
    );
  }
}
