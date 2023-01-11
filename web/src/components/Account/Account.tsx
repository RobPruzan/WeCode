import React, { ChangeEvent, useState } from 'react';
import WeCode, { PostContent } from '../../services/connections';
import { useQuery, useQueryClient } from 'react-query';

import { CustomTextField } from '../CustomTextField';
import { DockLocation } from '../Navbars/IconDock';
import { MainNavbar } from '../Navbars/MainNavbar';
import { PostedContents } from '../MainPage/FeedView/PostedContents/PostedContents';
import { RootState } from '../../redux/store';
import UserAccess from './UserAccess';
import { useFollowUserAction } from '../../hooks/useFollowUserAction';
import { useGetUserPosts } from '../../hooks/useGetUserPosts';
import { useSelector } from 'react-redux';
import { useUsersQuery } from '../../hooks/useUsersQuery';

const Account = () => {
  const queryClient = useQueryClient();
  const currentUser = useSelector(({ userState }: RootState) => userState.user);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  const { userPosts } = useGetUserPosts(currentUser?.id ?? -1);
  const reversedPosts =
    userPosts && userPosts.sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));

  const {
    data: followData,
    error: followError,
    isLoading: followIsLoading,
    isError: followIsError,
    mutate: followUser,
  } = useFollowUserAction('follow');
  const {
    data: unfollowData,
    error: unfollowError,
    isLoading: unfollowIsLoading,
    isError: unfollowIsError,
    mutate: unfollowUser,
  } = useFollowUserAction('unfollow');

  const handleFollow = (user_id: number, user_to_follow_id: number) => {
    followUser({
      user_id: user_id,
      user_id_to_act_on: user_to_follow_id,
    });
    // refetchFollowers();
  };

  const handleUnfollow = (user_id: number, user_to_unfollow_id: number) => {
    unfollowUser({
      user_id: user_id,
      user_id_to_act_on: user_to_unfollow_id,
    });
    // refetchFollowing();
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

  const handleUserSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedUserName(event.target.value);
  };

  const visibleUsers =
    otherUsers &&
    otherUsers
      .filter(user => {
        if (selectedUserName) {
          return user.name
            .toLowerCase()
            .includes(selectedUserName.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));

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
            <div className="grid grid-cols-2 h-screen overflow-hidden md:overflow-y-auto ">
              <div className="col-span-2 md:col-span-1 border-r-2 ">
                <div className="flex flex-col h-full w-full items-center p-8">
                  <UserAccess />
                  <CustomTextField
                    className="w-full"
                    label="User Search"
                    handleChange={handleUserSearch}
                    value={selectedUserName ?? ''}
                  />
                  <div
                    style={{
                      maxHeight: ' calc(60vh - 53px)',
                      overflowY: 'auto',
                    }}
                    className=" w-full mt-4  border-2 border-neon-blue p-3 overflow-y-auto rounded-md"
                  >
                    {visibleUsers && visibleUsers.length > 0 ? (
                      visibleUsers.map((otherUser, index) => (
                        <>
                          <div
                            key={index}
                            className="border-2 border-white w-full h-fit p-3 mt-4 grid grid-cols-2 gap-2 rounded-sm"
                          >
                            {otherUser.name}
                            {following?.find(
                              user => user.id === otherUser.id
                            ) ? (
                              <button
                                className="bg-gray-400 p-1 text-white  rounded-md hover:bg-gray-300"
                                onClick={_ =>
                                  currentUser &&
                                  handleUnfollow(currentUser?.id, otherUser.id)
                                }
                              >
                                Unfollow
                              </button>
                            ) : (
                              <button
                                className="bg-neon-blue p-1 text-white  rounded-md hover:bg-sky-300 "
                                onClick={_ =>
                                  currentUser &&
                                  handleFollow(currentUser?.id, otherUser.id)
                                }
                              >
                                Follow
                              </button>
                            )}
                          </div>
                        </>
                      ))
                    ) : (
                      <p className="text-2xl text-center">No Users Found</p>
                    )}
                    {}
                  </div>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1  ">
                <div
                  style={{
                    maxHeight: ' calc(80vh - 53px)',
                  }}
                  className="  w-full items-center p-8 mb-2 overflow-y-auto "
                >
                  {userPosts && (
                    <PostedContents
                      postedContent={userPosts}
                      isPostLoading={false}
                      setPostedContent={function (
                        value: React.SetStateAction<PostContent[]>
                      ): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  )}
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
