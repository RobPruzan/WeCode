import { useQuery, useQueryClient } from 'react-query';

import WeCode from '../services/connections';

export const useGetUserPosts = (userId: number) => {
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['user_posts', userId],
    () => WeCode.getUserPosts(userId)
  );
  return {
    userPosts: data,
    userPostsError: error,
    userPostsIsLoading: isLoading,
    userPostsIsError: isError,
    refetchUserPosts: refetch,
  };
};
