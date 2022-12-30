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
    return WeCode.getFollowing(1);
  });
  console.log('user object', users);
  return (
    <div className="account">
      <MainNavbar height="7.3" location={DockLocation.ACCOUNT} />
      <div style={{ display: 'flex' }}>
        <div>
          {users?.map(user => (
            <div key={user.id} className="border border-white p-2 m-2 ">
              <div className="d-flex"> Follow: {user.name}</div>

              <div>
                {' '}
                Friends: {user.friends.length}{' '}
                {user.friends?.map(friend => (
                  <div
                    key={`innerFriends ${friend?.id}`}
                    className="border border-white p-2 m-2 "
                  >
                    <div className="d-flex"> Friend: {friend?.name}</div>

                    <div> Following: {friend?.following?.length} hello</div>

                    <div> Followers: {friend?.followers?.length}</div>
                  </div>
                ))}
              </div>

              <div>
                {' '}
                Following: {user.following.length}
                <div className="border border-white p-2 m-2 ">
                  {user?.following?.map(following => (
                    <div
                      key={`innerFollowing ${following?.id}`}
                      className="border border-white p-2 m-2 "
                    >
                      {following?.name}
                    </div>
                  ))}
                </div>
              </div>

              <div> Followers: {user.followers.length}</div>
              <Button
                onClick={() => {
                  followUser({ user_id: 1, user_to_follow_id: user.id });
                }}
              >
                Follow {user.name}
              </Button>
            </div>
          ))}
        </div>
        <div className="border border-white p-2 m-2">
          <p className="h3">Following: {following?.length}</p>

          {following?.map(user => (
            <div key={user.id} className="border border-white p-2 m-2 ">
              <Button
                onClick={() => {
                  mutate({ user_id: 1, user_to_unfollow_id: user.id });
                }}
              >
                Unfollow {user.name}
              </Button>
            </div>
          ))}
        </div>
        <hr />
        <div className="flex"></div>
        <hr />
        <div></div>
        <UserAccess />
      </div>
    </div>
  );
};

export default Account;
