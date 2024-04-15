import { HttpResponse } from 'msw';

import {
  GetMeQueryResponse,
  GetUsersResponse,
  LoginMutationArguments,
  LoginMutationResponse,
} from 'api/actions/auth/auth.types';

import { rest } from './rest';

const authorizeHandler = rest.post<LoginMutationArguments, never, LoginMutationResponse>('/authorize', () => {
  return HttpResponse.json({
    accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
    tokenType: 'bearer',
    expires: 123,
    refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk',
  });
});
const meHandler = rest.get<never, never, GetMeQueryResponse>('/me', async () =>
  HttpResponse.json({
    firstName: 'Mike',
    lastName: 'Tyson',
    username: 'mike',
  }),
);

const createUsers = (numUsers = 40) => {
  return Array.from({ length: numUsers }, (el, index) => ({ id: index.toString(), name: `User ${index + 1}` }));
};

const usersHandler = rest.get<never, never, GetUsersResponse>('/users', ({ request }) => {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const countParam = url.searchParams.get('count');
  const page = pageParam ? parseInt(pageParam, 10) : null;
  const count = countParam ? parseInt(countParam, 10) : null;
  const allUsers = createUsers();

  if (page === null || count === null) {
    return HttpResponse.json({
      users: allUsers,
      nextPage: null,
    });
  }

  const start = page * count;
  const end = start + count;
  const nextPageCursor = end >= allUsers.length ? null : page + 1;
  const paginatedUsers = allUsers.slice(start, end);

  return HttpResponse.json({
    users: paginatedUsers,
    nextPage: nextPageCursor,
  });
});

export const handlers = [authorizeHandler, meHandler, usersHandler];
