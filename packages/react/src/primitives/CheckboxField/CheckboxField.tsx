import * as React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { Label } from '../Label';
import { Input } from '../Input';
import { ComponentClassNames, useAmplifyFieldID } from '../shared';
import { CheckboxFieldProps } from '../types';

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const {
    id,
    size,
    className,
    labelPosition,
    isLabelHidden,
    label,
    isDisabled,
    name,
    value,
    ...rest
  } = props;

  const fieldId = useAmplifyFieldID(id);

  return (
    <Label
      className={classNames(ComponentClassNames.CheckboxField, className)}
      htmlFor={fieldId}
      data-size={size}
      data-label-position={labelPosition}
      {...rest}
    >
      <View
        as={'span'}
        className={classNames(
          {
            'sr-only': isLabelHidden,
          },
          ComponentClassNames.CheckboxFieldLabel
        )}
      >
        {label}
      </View>
      <Input
        type="checkbox"
        id={fieldId}
        className={'sr-only'}
        disabled={isDisabled}
        name={name}
        checked={isOn}
        value={value}
      />
      <View
        as={'span'}
        className={ComponentClassNames.CheckboxFieldBox}
        data-checked={addAttr(isOn)}
        data-disabled={addAttr(isDisabled)}
        data-focused={addAttr(isFocused)}
      ></View>
    </Label>
  );
};
