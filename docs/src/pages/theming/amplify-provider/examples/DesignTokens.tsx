import * as React from 'react';
import {
  Expander,
  ExpanderItem,
  useTheme,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@aws-amplify/ui-react';

const flattenTokens = (tokenObject) => {
  if (tokenObject.value) {
    return [tokenObject];
  } else {
    return Object.values(tokenObject).reduce((prev: [], current) => {
      return [...prev, ...flattenTokens(current)];
    }, []);
  }
};

const createExpander = (designObject) => {
  const tokenExpanders = Object.keys(designObject).map((key) => {
    return (
      <ExpanderItem title={key} value={key}>
        <Table variation="striped">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Variable Name</TableCell>
              <TableCell>Original Value</TableCell>
            </TableRow>
          </TableHead>
          {designObject[key].map((value) => {
            return (
              <TableRow>
                <TableCell>{['tokens', ...value.path].join('.')}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.original}</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </ExpanderItem>
    );
  });
  return <Expander>{tokenExpanders}</Expander>;
};

export const DesignTokens = () => {
  const { tokens } = useTheme();
  const { components, ...rest } = tokens;
  const generalTokens = Object.entries(rest).reduce((prev, current) => {
    const [key, value] = current;
    prev[key] = flattenTokens(value);
    return prev;
  }, {});
  const componentTokens = Object.entries(components).reduce((prev, current) => {
    const [key, value] = current;
    prev[key] = flattenTokens(value);
    return prev;
  }, {});

  const generalExpander = React.useMemo(() => {
    return createExpander(generalTokens);
  }, [useTheme]);

  const componentExpander = React.useMemo(() => {
    return createExpander(componentTokens);
  }, [useTheme]);

  return (
    <Expander>
      <ExpanderItem title="Tokens" value="tokens">
        {generalExpander}
      </ExpanderItem>
      <ExpanderItem title="Components" value="components">
        {componentExpander}
      </ExpanderItem>
    </Expander>
  );
};
