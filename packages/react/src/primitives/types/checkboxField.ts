import { AriaProps, BaseComponentProps, Sizes } from './base';
import { BaseStyleProps } from './style';
import { InputProps } from './input';
import { FieldProps } from './field';

export type labelPositions = 'start' | 'end' | 'top' | 'bottom';
export interface CheckboxBaseProps {
  /**
   * If isChecked is provided, this will be a controlled SwitchField
   */
  isChecked?: boolean;
  /**
   * Use this to provide a default checked value for an uncontrolled SwitchField
   */
  defaultChecked?: boolean;

  /**
   * Label text for field (required)
   */
  label: React.ReactNode;

  /**
   * Position of label in relation to the switchfield
   */
  labelPosition?: labelPositions;

  /**
   * Hide label and use `aria-label` attribute instead. Common use case
   * is a search field.
   * @default false
   */
  isLabelHidden?: boolean;

  /**
   * Assign an onChange event to the switch field
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface CheckboxFieldProps
  extends CheckboxBaseProps,
    InputProps,
    FieldProps,
    BaseStyleProps {}
