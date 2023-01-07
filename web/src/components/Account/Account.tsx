import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Button } from '@mui/material';
import { DockLocation } from '../Navbars/IconDock';
import { MainNavbar } from '../Navbars/MainNavbar';
import React from 'react';
import { RootState } from '../../redux/store';
import UserAccess from './UserAccess';
import WeCode from '../../services/connections';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUsersQuery } from '../../hooks/useUsersQuery';

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

  const { users, usersError, usersIsLoading, usersIsError } = useUsersQuery();
  const { data: following } = useQuery('following', async () => {
    return currentUser && WeCode.getFollowing(currentUser.id);
  });

  return (
    <div className="custom-black-background flex flex-col h-screen w-screen  max-w-full bg-cust">
      <MainNavbar height="10" location={DockLocation.ACCOUNT} />
      <div className="flex justify-center items-center flex-grow">
        <div className=" grid  grid-rows-8 min-h-full w-full">
          <div className="row-span-2  ">
            <div className="grid grid-rows-2 h-full">
              <div className="row-span-1 border-b-2  ">
                <div className="grid grid-cols-3 h-full">
                  <div className="col-span-1 text-center flex items-center justify-center">
                    Followers
                  </div>
                  <div className="col-span-1 text-center flex items-center justify-center">
                    Following
                  </div>
                  <div className="col-span-1 text-center flex items-center justify-center">
                    Friends
                  </div>
                </div>
              </div>
              <div className="row-span-1 ">
                <div className="grid grid-cols-3 h-full">
                  <div className="col-span-1 text-center flex items-center justify-center">
                    {currentUser?.followers.length ?? 0}
                  </div>
                  <div className="col-span-1 text-center flex items-center justify-center">
                    {currentUser?.following.length ?? 0}
                  </div>
                  <div className="col-span-1 text-center flex items-center justify-center">
                    {currentUser?.friends.length ?? 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-6 border-t-2">
            <div className="grid grid-cols-2 h-full">
              <div className="col-span-1 border-r-2 ">
                <div className="flex flex-col h-full w-full items-center p-8">
                  <div className="border-2 border-white h-full w-80 overflow-y-scroll">
                    sdfsf
                  </div>
                </div>
              </div>
              <div className="col-span-1  ">
                <div className="flex flex-col h-full w-full items-center p-8">
                  <div className="border-2 border-white h-full w-10/12 overflow-y-scroll">
                    <UserAccess />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
