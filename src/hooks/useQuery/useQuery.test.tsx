import { renderHook, waitFor } from '@testing-library/react-native';

import axiosClient from 'api/axios';
import { AppProviders } from 'providers/AppProviders';

import { useQuery } from './useQuery';

const mockCurrentUser = {
  firstName: 'Test',
  lastName: 'User',
  username: 'testUser',
};

const mockApiResponse = (data: unknown, method: 'get' | 'post') => {
  const response = { status: 200, data: data };
  jest.spyOn(axiosClient, method).mockResolvedValue(response);
};

describe('useQuery', () => {
  afterAll(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  test('returns the data fetched from api', async () => {
    mockApiResponse(mockCurrentUser, 'get');

    const { result } = renderHook(() => useQuery('getCurrentUser', {}), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>
        </AppProviders>
      ),
    });

    expect(result.current.data).toBeUndefined();
    await waitFor(() => {
      expect(result.current.data).toBe(mockCurrentUser);
    });
  });

  test('returns proper loading state', async () => {
    mockApiResponse(mockCurrentUser, 'get');

    const { result } = renderHook(() => useQuery('getCurrentUser', {}), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>
        </AppProviders>
      ),
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  test('returns error status properly', async () => {
    const response = { status: 401 };
    jest.spyOn(axiosClient, 'get').mockRejectedValue(response);

    const { result } = renderHook(() => useQuery('getCurrentUser', {}, { retry: false }), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>
        </AppProviders>
      ),
    });

    expect(result.current.status).toBe('loading');
    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
  });
});
