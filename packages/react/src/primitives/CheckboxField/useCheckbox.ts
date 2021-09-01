import * as React from 'react';

export const useCheckbox = (props) => {
  const { onChange, isChecked, defaultChecked, isDisabled } = props;
  const isControlled = typeof isChecked !== 'undefined';
  const [isOn, setIsOn] = React.useState(
    isControlled ? isChecked : defaultChecked
  );

  const changeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      if (!isControlled) {
        typeof onChange === 'function' && onChange(event);
        setIsOn(event.target.checked);
      }
    },
    [onChange, isChecked]
  );

  if (isControlled && isOn !== isChecked) {
    setIsOn(isChecked);
  }
  return {
    isOn,
    changeHandler,
  };
};
