import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import WeCode, { PostContent } from '../services/connections';

import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export type FollowType = 'follow' | 'unfollow';

export type FollowActionMutationParams = {
  user_id: number;
  user_id_to_act_on: number;
};

export type UnFollow = {
  unfollow?: void;
  unfollowError: unknown;
  unfollowIsLoading: boolean;
  unfollowIsError: boolean;
  unfollowUser: UseMutateFunction<
    void,
    unknown,
    FollowActionMutationParams,
    unknown
  >;
};

export type Follow = {
  follow?: void;
  followError: unknown;
  followIsLoading: boolean;
  followIsError: boolean;
  followUser: UseMutateFunction<
    void,
    unknown,
    FollowActionMutationParams,
    unknown
  >;
};

export const useFollowUserAction = <T>(followType: FollowType) => {
  const queryClient = useQueryClient();
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const handleFollowAction = (user_id: number, user_to_follow_id: number) => {
    if (followType === 'follow') {
      console.log('plesase?');
      return WeCode.followerUser(user_id, user_to_follow_id);
    } else {
      console.log('plesase2?');
      return WeCode.unfollowerUser(user_id, user_to_follow_id);
    }
  };
  const { data, mutate, error, isLoading, isError } = useMutation(
    ({ user_id, user_id_to_act_on }: FollowActionMutationParams) =>
      handleFollowAction(user_id, user_id_to_act_on),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['following']); // if the mutation is successful, refetch the related query
      },
    }
  );
  if (followType === 'unfollow') {
    return {
      unfollowData: data,
      unfollowError: error,
      unfollowIsLoading: isLoading,
      unfollowIsError: isError,
      unfollowUser: mutate,
    } as T;
  }
  // return different things based on generic type

  return {
    followData: data,
    followError: error,
    followIsLoading: isLoading,
    followIsError: isError,
    followUser: mutate,
  } as T;
};
