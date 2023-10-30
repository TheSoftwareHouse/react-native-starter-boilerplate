import { ApiClientContextController } from '../context/apiClient/apiClientContextController/ApiClientContextController';
import { AuthContextController } from '../context/auth/authContextController/AuthContextController';
import { LocaleContextController } from '../context/locale/localeContextController/LocaleContextController';

import { AppProvidersProps } from './AppProviders.types';

export const AppProviders = ({ children }: AppProvidersProps) => (
  <LocaleContextController>
    <ApiClientContextController>
      <AuthContextController>{children}</AuthContextController>
    </ApiClientContextController>
  </LocaleContextController>
);
