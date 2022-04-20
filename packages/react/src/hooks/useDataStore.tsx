import * as React from 'react';

import { DataStore, PersistentModel } from '@aws-amplify/datastore';

import {
  DataStoreBindingProps,
  DataStoreCollectionProps,
  DataStoreCollectionResult,
  DataStoreItemProps,
  DataStoreItemResult,
} from '../primitives/types/datastore';

/**
 * Perform a collection query against a DataStore model
 * @internal
 */
export const useDataStoreCollection = <M extends PersistentModel>({
  model,
  criteria,
  pagination,
}: DataStoreCollectionProps<M>): DataStoreCollectionResult<M> => {
  const [result, setResult] = React.useState<DataStoreCollectionResult<M>>({
    items: [],
    isLoading: true,
    error: undefined,
  });

  const fetch = () => {
    const subscription = DataStore.observeQuery(
      model,
      criteria,
      pagination
    ).subscribe(
      (snapshot) => setResult({ items: snapshot.items, isLoading: false }),
      (error) => setResult({ items: [], error, isLoading: false })
    );

    // Unsubscribe from query updates on unmount
    if (subscription) {
      return () => subscription.unsubscribe();
    }
  };

  // Fetch on next render cycle
  // useEffect should only run once here
  // Ignore exhaustive dependencies rule here by design
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fetch, []);

  return result;
};

/**
 * Perform a single record query against a DataStore model
 * @internal
 */
export const useDataStoreItem = <M extends PersistentModel>({
  model,
  id,
}: DataStoreItemProps<M>): DataStoreItemResult<M> => {
  const [item, setItem] = React.useState<M>();
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error>();

  const fetch = () => {
    DataStore.query(model, id)
      .then(setItem)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  // Fetch on next render cycle
  // useEffect should only run once here
  // Ignore exhaustive dependencies rule here by design
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fetch, []);

  return {
    error,
    item,
    isLoading,
  };
};

/**
 * Perform a query against a DataStore model
 * @internal
 */
export function useDataStoreBinding<Model extends PersistentModel>(
  props: DataStoreBindingProps<Model, 'record'>
): DataStoreItemResult<Model>;
export function useDataStoreBinding<Model extends PersistentModel>(
  props: DataStoreBindingProps<Model, 'collection'>
): DataStoreCollectionResult<Model>;
export function useDataStoreBinding<Model extends PersistentModel>(
  props:
    | DataStoreBindingProps<Model, 'record'>
    | DataStoreBindingProps<Model, 'collection'>
): DataStoreItemResult<Model> | DataStoreCollectionResult<Model> {
  return props.type === 'record'
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useDataStoreItem(props)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useDataStoreCollection(props);
}
