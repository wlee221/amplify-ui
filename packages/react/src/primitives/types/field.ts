import { FieldGroupIconButtonProps } from './fieldGroupIcon';
import { InputProps } from './input';
import { TextProps } from './text';

/**
 * Shared type across all field types
 */
export interface FieldProps {
  /**
   * Provides additional information needed to fill field
   * (e.g. password requirements, etc.)
   */
  descriptiveText?: React.ReactNode;

  /**
   *  When defined and `hasError` is true, show error message
   */
  errorMessage?: string;

  /**
   * Label text for field (required)
   */
  label: React.ReactNode;

  /**
   * Visually hide label (not recommended in most cases)
   * Deprecated, use isLabelHidden
   * @default false
   * @deprecated Will be removed in next major version bump
   */
  labelHidden?: boolean;

  /**
   * Visually hide label (not recommended in most cases)
   * @default false
   */
  isLabelHidden?: boolean;
}

export interface FieldClearButtonProps
  extends Partial<FieldGroupIconButtonProps> {}
export interface FieldDescriptionProps
  extends TextProps,
    Pick<FieldProps, 'descriptiveText' | 'isLabelHidden'> {}
export interface FieldErrorMessageProps
  extends TextProps,
    Pick<FieldProps, 'errorMessage'>,
    Pick<InputProps, 'hasError'> {}

export type FieldVariations = 'quiet';

export type LabelPositions = 'start' | 'end' | 'top' | 'bottom';
