import { authMutations } from './auth/auth.mutations';
import { authQueries } from './auth/auth.queries';
import { paymentMutations } from './payment/payment.mutations';
import { paymentQueries } from './payment/payment.queries';
// API_COLLECTION_IMPORTS

export const queries = {
  ...authQueries,
  ...paymentQueries,
  // API_COLLECTION_QUERIES
} as const;

export type AxiosQueriesType = typeof queries;

export type AxiosInfiniteQueriesType = Pick<AxiosQueriesType, 'getUsersInfinite'>;

export const mutations = {
  ...authMutations,
  ...paymentMutations,
  // API_COLLECTION_MUTATIONS
} as const;

export type AxiosMutationsType = typeof mutations;
