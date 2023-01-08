import {
  Follow,
  UnFollow,
  useFollowUserAction,
} from '../../hooks/useFollowUserAction';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Button } from '@mui/material';
import { CustomTextField } from '../CustomTextField';
import { DockLocation } from '../Navbars/IconDock';
import { MainNavbar } from '../Navbars/MainNavbar';
import React from 'react';
import { RootState } from '../../redux/store';
import UserAccess from './UserAccess';
import WeCode from '../../services/connections';
import { useGetPosts } from '../../hooks/useGetPosts';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUsersQuery } from '../../hooks/useUsersQuery';

const Account = () => {
  const queryClient = useQueryClient();
  const currentUser = useSelector(({ userState }: RootState) => userState.user);

  // Passing that follow action twice because it's an anti-pattern to run functions based on types- https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals#non-goals
  // The purpose of the 2 types is to give us better type safety, while following good practices
  const { followUser, followIsLoading } = useFollowUserAction<Follow>('follow');
  const { unfollowUser, unfollowIsLoading } =
    useFollowUserAction<UnFollow>('unfollow');

  const handleFollow = (user_id: number, user_to_follow_id: number) => {
    followUser({
      user_id: user_id,
      user_id_to_act_on: user_to_follow_id,
    });
    refetchFollowers();
  };

  const handleUnfollow = (user_id: number, user_to_unfollow_id: number) => {
    unfollowUser({
      user_id: user_id,
      user_id_to_act_on: user_to_unfollow_id,
    });
    refetchFollowing();
  };

  const {
    users: otherUsers,
    usersError,
    usersIsLoading,
    usersIsError,
  } = useUsersQuery();

  const { data: followers, refetch: refetchFollowers } = useQuery(
    ['followers', currentUser?.id],
    () => {
      return currentUser && WeCode.getFollowers(currentUser.id);
    }
  );

  const { data: following, refetch: refetchFollowing } = useQuery(
    ['following', currentUser?.id],
    () => {
      return currentUser && WeCode.getFollowing(currentUser.id);
    }
  );

  return (
    <div className="custom-black-background flex flex-col h-screen w-screen  max-w-full bg-cust">
      <MainNavbar height="10" location={DockLocation.ACCOUNT} />
      <div className="flex justify-center items-center flex-grow">
        <div className=" grid  grid-rows-8 min-h-full w-full p-3">
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
              <div className="row-span-1 p-3">
                <div className="grid grid-cols-3 h-full">
                  <div className="col-span-1 text-center flex items-center justify-center">
                    {followers?.length ?? 0}
                  </div>
                  <div className="col-span-1 text-center flex items-center justify-center">
                    {following?.length ?? 0}
                  </div>
                  <div className="col-span-1 text-center flex items-center justify-center">
                    {currentUser?.friends.length ?? 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-6 border-t-2">
            <div className="grid grid-cols-2 h-screen overflow-y-scroll ">
              <div className="col-span-2 md:col-span-1 border-r-2 ">
                <div className="flex flex-col h-full w-full items-center p-8">
                  <UserAccess />
                  <CustomTextField
                    className="w-full"
                    label="User Search"
                    handleChange={function (
                      event: React.ChangeEvent<Element>
                    ): void {
                      throw new Error('Function not implemented.');
                    }}
                    value={''}
                  />
                  <div className=" w-full mt-4 h-80 border-2 border-neon-blue p-3 overflow-y-scroll">
                    {otherUsers?.map((otherUser, index) => (
                      <>
                        <div
                          key={index}
                          className="border-2 border-white w-full h-fit p-2 mt-4 flex justify-evenly"
                        >
                          {otherUser.name}
                          <button
                            className="bg-neon-blue p-1 text-white  rounded-md hover:bg-blue-400 "
                            onClick={_ =>
                              currentUser &&
                              handleFollow(currentUser?.id, otherUser.id)
                            }
                          >
                            Follow
                          </button>
                          <button
                            className="bg-neon-blue p-1 text-white  rounded-md hover:bg-blue-400"
                            onClick={_ =>
                              currentUser &&
                              handleUnfollow(currentUser?.id, otherUser.id)
                            }
                          >
                            Unfollow
                          </button>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-1  ">
                <div className="  w-full items-center p-8 mb-2 overflow-y-scroll h-screen ">
                  {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                    <div
                      key={index}
                      className="border-2 border-white w-full h-28 mt-4"
                    >
                      psoesdfsdfs
                    </div>
                  ))}
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
