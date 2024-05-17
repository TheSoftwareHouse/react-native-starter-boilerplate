import { QueryKey, UseQueryOptions, useQuery as useRQQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { AxiosQueriesType, queries } from 'api/actions';
import { DataForQuery, GetQueryParams } from 'api/types/types';
import { useApiClient } from 'hooks/useApiClient/useApiClient';
import { parseQueryKey } from 'utils/parseQueryKey';

export const useQuery = <Key extends keyof AxiosQueriesType, TError = unknown>(
  query: Key,
  args: GetQueryParams<Key>,
  options?: Omit<UseQueryOptions<DataForQuery<Key>, TError>, 'queryKey' | 'queryFn'>,
) => {
  const { client } = useApiClient();
  const queryClient = useQueryClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = parseQueryKey(query, args);

  const result = useRQQuery<DataForQuery<Key>, TError>({
    queryKey,
    queryFn: async () => await queryFn(args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options as any),
  });

  const remove = useCallback(() => queryClient.removeQueries({ queryKey }), [queryClient, queryKey]);

  return {
    ...result,
    isLoadingAndEnabled: result.isLoading && result.fetchStatus !== 'idle',
    remove,
  };
};
