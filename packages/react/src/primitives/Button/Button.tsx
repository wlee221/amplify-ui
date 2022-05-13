import classNames from 'classnames';
import * as React from 'react';
import kebabCase from 'lodash/kebabCase';

import { classNameModifier, classNameModifierByFlag } from '../shared/utils';
import { ButtonProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { Loader } from '../Loader';
import { View } from '../View';

const CSS_VARIABLE_PREFIX = 'amplify';

function cssNameTransform({ path = [] }): string {
  return `--${kebabCase(
    [CSS_VARIABLE_PREFIX, 'components', 'button', ...path].join(' ')
  )}`;
}

function flattenTheme(obj = {}, arr = {}, path = []) {
  if (obj.hasOwnProperty('value')) {
    const key = cssNameTransform({ path });
    arr[key] = obj.value;
  } else if (typeof obj === 'object') {
    for (const name in obj) {
      if (obj.hasOwnProperty(name)) {
        flattenTheme(obj[name], arr, [...path, name]);
      }
    }
  }

  return arr;
}

const ButtonPrimitive: Primitive<ButtonProps, 'button'> = (
  {
    className,
    children,
    isFullWidth = false,
    isDisabled,
    isLoading,
    loadingText = '',
    size,
    type = 'button',
    theme,
    variation,
    style,
    ...rest
  },
  ref
) => {
  const componentClasses = classNames(
    ComponentClassNames.Button,
    ComponentClassNames.FieldGroupControl,
    classNameModifier(ComponentClassNames.Button, variation),
    classNameModifier(ComponentClassNames.Button, size),
    classNameModifierByFlag(
      ComponentClassNames.Button,
      'disabled',
      isDisabled || isLoading || rest['disabled']
    ),
    classNameModifierByFlag(ComponentClassNames.Button, 'loading', isLoading),
    classNameModifierByFlag(
      ComponentClassNames.Button,
      'fullwidth',
      isFullWidth
    ),
    className
  );
  const t = flattenTheme(theme);

  return (
    <View
      ref={ref}
      as="button"
      className={componentClasses}
      data-fullwidth={isFullWidth}
      data-loading={isLoading}
      data-size={size}
      data-variation={variation}
      isDisabled={isDisabled || isLoading}
      type={type}
      style={{
        ...style,
        ...t,
      }}
      {...rest}
    >
      {isLoading && loadingText ? (
        <Flex as="span" className={ComponentClassNames.ButtonLoaderWrapper}>
          <Loader size={size} />
          {loadingText}
        </Flex>
      ) : (
        children
      )}
    </View>
  );
};

export const Button = React.forwardRef(ButtonPrimitive);

Button.displayName = 'Button';
