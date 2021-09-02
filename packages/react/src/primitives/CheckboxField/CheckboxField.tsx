import * as React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { Label } from '../Label';
import { Input } from '../Input';
import { ComponentClassNames, useAmplifyFieldID, addAttr } from '../shared';
import { CheckboxFieldProps } from '../types';
import { useCheckbox } from './useCheckbox';
import { IconCheck, IconCheckBox } from '../Icon';

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
    onChange,
    isChecked,
    defaultChecked,
    checkColor = 'white',
    ...rest
  } = props;

  const fieldId = useAmplifyFieldID(id);
  const { isOn, changeHandler } = useCheckbox({
    onChange,
    isChecked,
    defaultChecked,
    isDisabled,
  });

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
        onChange={changeHandler}
        name={name}
        checked={isOn}
        value={value}
      />
      <View
        as={'span'}
        className={ComponentClassNames.CheckboxFieldBox}
        data-checked={addAttr(isOn)}
      >
        {isOn && <IconCheck color={checkColor} data-checked={addAttr(isOn)} />}
      </View>
    </Label>
  );
};
