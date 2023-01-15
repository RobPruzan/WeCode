import { ChangeEvent, useState } from 'react';

import AccountData from './AccountData';
import { DockLocation } from '../Navbars/IconDock';
import { MainNavbar } from '../Navbars/MainNavbar';
import { RootState } from '../../redux/store';
import UserConnections from './UserConnections';
import { UserMinimal } from '../../services/connections';
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
  const getUsersQuery = useUsersQuery();

  const [selectedUser, setSelectedUser] = useState<
    UserMinimal | null | undefined
  >({ label: currentUser?.name ?? '', id: currentUser?.id ?? 0 });
  const getFollowersQuery = useGetFollowers(selectedUser?.id ?? 0);
  const getFollowingQuery = useGetFollowing(selectedUser?.id ?? 0);

  const { userPosts } = useGetUserPosts(selectedUser?.id ?? -1);

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
            setSelectedUser={setSelectedUser}
            currentUser={currentUser}
            followers={getFollowersQuery.data}
            following={getFollowingQuery.data}
            selectedUser={selectedUser}
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
              followers={getFollowersQuery.data}
              following={getFollowingQuery.data}
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
