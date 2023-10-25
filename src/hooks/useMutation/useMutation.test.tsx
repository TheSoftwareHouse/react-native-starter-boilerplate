import { act, renderHook, waitFor } from '@testing-library/react-native';

import axiosClient from 'api/axios';
import { AppProviders } from 'providers/AppProviders';

import { useMutation } from './useMutation';

const mockMutationResponse = {
  token: '87sa6dsa7dfsa8d87',
};

describe('useMutation', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('returns the data fetched from api on mutation', async () => {
    const response = { status: 200, data: mockMutationResponse };
    jest.spyOn(axiosClient, 'post').mockResolvedValue(response);

    const { result } = renderHook(() => useMutation('loginMutation'), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>
        </AppProviders>
      ),
    });

    expect(result.current.data).toBeUndefined();
    act(() => result.current?.mutate({ password: 'foo', username: 'bar' }));
    await waitFor(() => {
      expect(result.current.data).toBe(mockMutationResponse);
    });
  });
});
