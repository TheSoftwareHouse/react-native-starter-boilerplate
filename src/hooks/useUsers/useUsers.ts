import { useInfiniteQuery } from 'hooks/useInifiniteQuery/useInfiniteQuery';

export const useUsers = () =>
  useInfiniteQuery(
    'getUsersInfinite',
    {},
    {
      initialPageParam: 0,
      getNextPageParam: ({ nextPage }) => {
        return nextPage;
      },
    },
  );
