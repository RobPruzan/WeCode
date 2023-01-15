import { useMutation, useQueryClient } from 'react-query';

import { RootState } from '../../redux/store';
import WeCode from '../../services/connections';
import { useSelector } from 'react-redux';

export type FollowType = 'follow' | 'unfollow';

export type FollowActionMutationParams = {
  user_id: number;
  user_id_to_act_on: number;
};

export const useFollowUserAction = (followType: FollowType) => {
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const queryClient = useQueryClient();
  const handleFollowAction = (user_id: number, user_to_follow_id: number) => {
    if (followType === 'follow') {
      return WeCode.followerUser(user_id, user_to_follow_id);
    } else {
      return WeCode.unfollowUser(user_id, user_to_follow_id);
    }
  };
  const followUserActionMutation = useMutation(
    ({ user_id, user_id_to_act_on }: FollowActionMutationParams) =>
      handleFollowAction(user_id, user_id_to_act_on),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['following', userId]); // if the mutation is successful, refetch the related query
      },
    }
  );

  return followUserActionMutation;
};
