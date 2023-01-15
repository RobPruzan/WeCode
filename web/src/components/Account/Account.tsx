import { ChangeEvent, useState } from 'react';

import AccountData from './AccountData';
import { DockLocation } from '../Navbars/IconDock';
import { MainNavbar } from '../Navbars/MainNavbar';
import { RootState } from '../../redux/store';
import UserConnections from './UserConnections';
import { useGetFollowers } from '../../hooks/UserHooks/useGetFollowers';
import { useGetFollowing } from '../../hooks/UserHooks/useGetFollowing';
import { useGetUserPosts } from '../../hooks/PostHooks/useGetUserPosts';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useUsersQuery } from '../../hooks/UserHooks/useUsersQuery';

const Account = () => {
  const queryClient = useQueryClient();
  const currentUser = useSelector(({ userState }: RootState) => userState.user);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [buttonIndex, setButtonIndex] = useState<number>(0);
  const { userPosts } = useGetUserPosts(currentUser?.id ?? -1);

  const getUsersQuery = useUsersQuery();

  const followersQuery = useGetFollowers(currentUser?.id ?? 0);
  const followingQuery = useGetFollowing(currentUser?.id ?? 0);

  const handleUserSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedUserName(event.target.value);
  };

  const visibleUsers = getUsersQuery.isSuccess
    ? getUsersQuery.data
        .filter(user => {
          if (selectedUserName) {
            return user.name
              .toLowerCase()
              .includes(selectedUserName.toLowerCase());
          }
          return true;
        })
        .sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0))
    : [];

  return (
    <div className="custom-black-background flex flex-col h-screen w-screen  max-w-full">
      <MainNavbar height="10" location={DockLocation.ACCOUNT} />
      <div className="flex justify-center items-center flex-grow">
        <div className=" grid  grid-rows-8 min-h-full w-full p-3">
          <div className="flex justify-center  "></div>
          <UserConnections
            currentUser={currentUser}
            followers={followersQuery.data}
            following={followingQuery.data}
          />
          <div className="row-span-2  ">
            <div className="grid  h-full p-8">
              <div className="row-span-1  "></div>
            </div>
          </div>
          <div className="row-span-6  border-neon-blue">
            <AccountData
              buttonIndex={buttonIndex}
              setButtonIndex={setButtonIndex}
              handleUserSearch={handleUserSearch}
              visibleUsers={visibleUsers}
              currentUser={currentUser}
              following={followingQuery.data}
              followers={followersQuery.data}
              selectedUserName={selectedUserName}
              userPosts={userPosts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
