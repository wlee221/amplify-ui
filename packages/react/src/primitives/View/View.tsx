import * as React from 'react';
import { useStyles } from '../shared/styleUtils';
import {
  ElementType,
  HTMLElementType,
  PrimitivePropsWithRef,
  ViewProps,
} from '../types';

const ViewPrimitive = <Element extends ElementType = 'div'>(
  {
    as = 'div',
    children,
    testId,
    ariaLabel,
    isDisabled,
    style,
    theme,
    ...rest
  }: PrimitivePropsWithRef<ViewProps, Element>,
  ref?: React.ForwardedRef<HTMLElementType<Element>>
) => {
  const { propStyles, nonStyleProps } = useStyles(rest, style, theme);

  return React.createElement(
    as,
    {
      'aria-label': ariaLabel,
      'data-testid': testId,
      disabled: isDisabled,
      ref,
      style: propStyles,
      ...nonStyleProps,
    },
    children
  );
};

export const View = React.forwardRef(ViewPrimitive);

View.displayName = 'View';
