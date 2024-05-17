import { QueryKey, useInfiniteQuery as useRQInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

import { AxiosInfiniteQueriesType, queries } from 'api/actions';
import { DataForQuery, GetQueryParams } from 'api/types/types';
import { useApiClient } from 'hooks/useApiClient/useApiClient';

/**
 * Fetching data using this hook doesn't require specifying query function like it's required in react-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook uses proper querying strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useInfiniteQuery = <Key extends keyof AxiosInfiniteQueriesType, TError = unknown>(
  query: Key,
  args?: GetQueryParams<Key>,
  options?: Omit<UseInfiniteQueryOptions<DataForQuery<Key>, TError>, 'queryKey' | 'queryFn'>,
) => {
  const { client } = useApiClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = [query];

  return useRQInfiniteQuery<DataForQuery<Key>, TError>({
    queryKey,
    queryFn: async ({ pageParam }: { pageParam?: string }) => await queryFn({ pageParam, ...(args || {}) }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options as any),
  });
};
