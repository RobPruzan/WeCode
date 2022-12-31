import { Button } from '@mui/material';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import WeCode from '../../services/connections';
import { DockLocation } from '../Navbars/IconDock';
import { MainNavbar } from '../Navbars/MainNavbar';
import UserAccess from './UserAccess';

export type FollowMutationParams = {
  user_id: number;
  user_to_follow_id: number;
};

export type UnFollowMutationParams = {
  user_id: number;
  user_to_unfollow_id: number;
};

const Account = () => {
  const queryClient = useQueryClient();
  const currentUser = useSelector(({ userState }: RootState) => userState.user);
  const { id } = useParams<{ id: string }>();
  const {
    mutate: followUser,
    error: followError,
    isLoading: followLoading,
    isError: isFollowError,
  } = useMutation(
    async ({ user_id, user_to_follow_id }: FollowMutationParams) => {
      const response = await WeCode.followerUser(user_id, user_to_follow_id);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['following', id]); // if the mutation is successful, refetch the related query
      },
    }
  );
  const { mutate, error, isLoading, isError } = useMutation(
    async ({ user_id, user_to_unfollow_id }: UnFollowMutationParams) => {
      const response = await WeCode.unfollowerUser(
        user_id,
        user_to_unfollow_id
      );
      return response;
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(['following', id]);
      },
    }
  );

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    isError: isUsersError,
  } = useQuery('user_accounts', async () => {
    return WeCode.getUsers();
  });
  const { data: following } = useQuery('following', async () => {
    return currentUser && WeCode.getFollowing(currentUser.id);
  });

  return (
    <div className="account">
      <MainNavbar height="7.3" location={DockLocation.ACCOUNT} />

      <UserAccess />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {users?.map(user => (
          <div key={user.id} className="border border-white p-2 m-2 ">
            <div className="d-flex"> Follow: {user.name}</div>
            <div>
              {' '}
              <Button
                onClick={() =>
                  followUser({ user_id: user.id, user_to_follow_id: user.id })
                }
              >
                Follow
              </Button>
            </div>
            <div> </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
