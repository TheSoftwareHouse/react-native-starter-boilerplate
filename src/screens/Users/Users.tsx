import { styled } from 'nativewind';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { User as UserType } from 'api/actions/auth/auth.types';
import { useUsers } from 'hooks/useUsers/useUsers';

import { User } from './User/User';

const StyledList = styled(FlatList<UserType>, {
  props: {
    contentContainerStyle: true,
  },
});

const Separator = () => <View className="h-2 bg-blue-50" />;

export const Users = () => {
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useUsers();

  const loadMoreUsers = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <SafeAreaView className="px-5 pt-5 h-screen flex-1" edges={['bottom']}>
      <View className="">
        <Text className="mb-4 text-xl font-bold">List of users </Text>
        <Text className="text-base mb-4">
          Here you can see list of users generated in MSW handlers.ts file. When you scroll to the end of the list a
          request will be automatically executed to fetch more users.
        </Text>
        {(isFetching || isFetchingNextPage) && <Text>Loading...</Text>}
        {!hasNextPage && <Text className="text-base text-green-600">All users loaded!</Text>}
      </View>
      <View className="flex-1">
        <StyledList
          data={data?.pages.flatMap((users) => users.users)}
          renderItem={({ item }) => <User user={item} />}
          keyExtractor={(item) => item.id}
          onEndReached={() => loadMoreUsers()}
          onEndReachedThreshold={0.3}
          ItemSeparatorComponent={Separator}
          persistentScrollbar={true}
          scrollEnabled
          contentContainerStyle="pb-5"
        />
      </View>
    </SafeAreaView>
  );
};
