import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';

import { TabParamList } from '../../navigations/Navigator.types';

import { AboutMe } from './aboutMe/AboutMe';
import { Details } from './details/Details';
import { Settings } from './settings/Settings';

const Tab = createBottomTabNavigator<TabParamList>();

export const Profile = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarActiveBackgroundColor: '#87b1f5',
        tabBarStyle: { height: 80 },
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="AboutMe"
        component={AboutMe}
        options={{
          title: 'About me',
          tabBarIcon: () => <Image source={require('./../../assets/images/aboutMe.png')} className="w-6 h-6" />,
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Details',
          tabBarIcon: () => <Image source={require('./../../assets/images/card.png')} className="w-6 h-6" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: () => <Image source={require('./../../assets/images/settings.png')} className="w-6 h-6" />,
        }}
      />
    </Tab.Navigator>
  );
};
