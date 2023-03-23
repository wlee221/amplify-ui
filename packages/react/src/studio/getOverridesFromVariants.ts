import { Variant, VariantValues } from './types';

/**
 * 🚨 WARNING:🚨
 * This function is owned by the Studio UI Builder team
 * and is used by code generated by Amplify CLI.
 *
 * When considering making changing to this file, please consult
 * a member from the Studio UI Builder team.
 */

/**
 * Given a list of style variants, select a given one based on input props
 * @internal
 * @param variants list of style variants to select from
 * @param props variant values to select from the list, may include additional props, to tidy up usage upstream
 */
export function getOverridesFromVariants<T>(
  variants: Variant[],
  props: { [key: string]: T }
): { [key: string]: Variant } {
  // Get unique keys from the provided variants
  const variantValueKeys = [
    ...new Set(
      variants.flatMap((variant) => Object.keys(variant.variantValues))
    ),
  ];

  // Get variant value object from provided props, dropping keys that aren't in variantValueKeys, or whose vals are falsey
  const variantValuesFromProps: VariantValues = Object.keys(props)
    .filter((i) => variantValueKeys.includes(i) && props[i])
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: props[key],
      };
    }, {});

  const matchedVariants = variants.filter(({ variantValues }) => {
    return (
      Object.keys(variantValues).length ===
        Object.keys(variantValuesFromProps).length &&
      Object.entries(variantValues).every(
        ([key, value]) => variantValuesFromProps[key] === value
      )
    );
  });

  return matchedVariants.reduce((overrides, variant) => {
    return { ...overrides, ...variant.overrides };
  }, {});
}
