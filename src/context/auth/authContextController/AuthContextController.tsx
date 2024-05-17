import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useMMKVObject } from 'react-native-mmkv';

import { useMutation } from 'hooks/useMutation/useMutation';
import { useUser } from 'hooks/useUser/useUser';
import { authStorage as storage } from 'storage/storage';

import { resetTokens, setTokens } from '../authActionCreators/authActionCreators';
import { AuthContext } from '../authContext/AuthContext';
import { AuthContextValue } from '../authContext/AuthContext.types';
import { authReducer } from '../authReducer/authReducer';
import { AuthState } from '../authReducer/authReducer.types';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const [authStorage, setAuthStorage] = useMMKVObject<AuthState>('auth', storage);
  const [state, dispatch] = useReducer(
    authReducer,
    authStorage || {
      accessToken: null,
      refreshToken: null,
      expires: null,
    },
  );

  const { mutateAsync: login, isPending: isAuthenticating } = useMutation('loginMutation', {
    onSuccess: (res) => {
      dispatch(
        setTokens({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          expires: res.expires,
        }),
      );
    },
    onError: () => {
      dispatch(resetTokens());
      resetUser();
    },
  });

  const {
    data: user,
    isLoadingAndEnabled,
    isSuccess: isUserSuccess,
    remove: resetUser,
    isError: isUserError,
  } = useUser({
    enabled: !!state.accessToken,
  });

  useEffect(() => {
    if (isUserError) {
      dispatch(resetTokens());
    }
  }, [isUserError]);

  const logout = useCallback(() => {
    resetUser();
    dispatch(resetTokens());
  }, [resetUser]);

  useEffect(() => {
    setAuthStorage(state);
  }, [state, setAuthStorage]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      isAuthenticating: isAuthenticating || isLoadingAndEnabled,
      isAuthenticated: isUserSuccess,
      login,
      logout,
      user,
    }),
    [state, isAuthenticating, isUserSuccess, isLoadingAndEnabled, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
