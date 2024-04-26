import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

import Button from 'components/Button/Button';
import { Translation } from 'components/Translation/Translation';
import { AppLocale } from 'context/locale/AppLocale.enum';
import { useAuth } from 'hooks/useAuth/useAuth';
import { useLocale } from 'hooks/useLocale/useLocale';

export const Home = () => {
  const { locale, setLocale } = useLocale();
  const navigation = useNavigation();
  const { user, login, logout, isAuthenticated, isAuthenticating } = useAuth();

  return (
    <View className="flex-1 items-center justify-center">
      {isAuthenticating && <Text>Loading...</Text>}
      {isAuthenticated ? (
        <View className="gap-2">
          <Translation id="home.helloWorld" values={{ name: user?.firstName }} className="text-xl text-center mb-3" />
          <Button label="Show users" onPress={() => navigation.navigate('Users')} testID="goToUsersButton" />
          <Button label="Go to Profile" onPress={() => navigation.navigate('Profile')} testID="goToProfileButton" />
          <Button label="Go to Profile (Drawer Navigation)" onPress={() => navigation.navigate('ProfileDrawer')} />
          <Button label="Go to Profile (Shared Navigation)" onPress={() => navigation.navigate('SharedNavProfile')} />
          {locale === AppLocale.pl && (
            <Button
              label="Switch language to EN"
              onPress={() => setLocale(AppLocale.en)}
              buttonClassName="bg-transparent"
              labelClassName="text-black"
            />
          )}
          {locale === AppLocale.en && (
            <Button
              label="Switch language to PL"
              onPress={() => setLocale(AppLocale.pl)}
              buttonClassName="bg-transparent"
              labelClassName="text-black"
            />
          )}
          <Button
            label="Logout"
            onPress={() => logout()}
            buttonClassName="bg-transparent"
            labelClassName="text-black"
          />
        </View>
      ) : (
        <Button
          label="Login"
          testID="loginButton"
          onPress={() => login({ password: '123', username: 'test' })}
          disabled={isAuthenticating}
        />
      )}
    </View>
  );
};
