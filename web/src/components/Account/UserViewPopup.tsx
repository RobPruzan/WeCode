import React, { Dispatch, SetStateAction, useState } from 'react';
import WeCode, { User, UserMinimal } from '../../services/connections';

import { BsXCircle } from 'react-icons/bs';
import { RootState } from '../../redux/store';
import { UserConnectionTypes } from './UserConnections';
import { useGetFollowers } from '../../hooks/UserHooks/useGetFollowers';
import { useGetFollowing } from '../../hooks/UserHooks/useGetFollowing';
import { useSelector } from 'react-redux';

export type UserViewPopupProps = {
  users: User[] | null | undefined;
  userType: UserConnectionTypes;
  popupX: number;
  popupY: number;
  setSelectedUserId: Dispatch<SetStateAction<UserMinimal | null | undefined>>;
};

const UserViewPopup = ({
  userType,
  users,
  popupX,
  popupY,
  setSelectedUserId,
}: UserViewPopupProps) => {
  const currUserId = useSelector(
    ({ userState }: RootState) => userState.user?.id
  );
  // const [selectedUserId, setSelectedUserId] = useState<
  //   number | null | undefined
  // >(currUserId);
  // const getFollowersQuery = useGetFollowers(selectedUserId ?? 0);
  // const getFollowingQuery = useGetFollowing(selectedUserId ?? 0);

  WeCode.getFollowers;
  return (
    <div style={{ top: `${popupY}px`, left: `${popupX}px` }}>
      <div className="bg-custom-dark-gray w-60 p-4 absolute rounded-lg shadow-md overflow-auto flex flex-col justify-center items-center z-40 h-56 border-2 border-white ">
        {users?.map(user => (
          <button
            onClick={e => {
              setSelectedUserId({ id: user.id, label: user.name });
              console.log(user.id);
            }}
            className="w-full"
          >
            <div className="flex flex-row px-4 bg-zinc-900 justify-center items-center border-x-2 border-x-neon-blue w-full my-4 shadow-lg hover:bg-slate-800 cursor-pointer">
              <p className="text-xl font-bold">{user.name}</p>
            </div>
          </button>
        ))}
      </div>
      {/* <button className="w-full z-50 rounded-lg bg-red-500 text-white text-xl p-2 hover:bg-red-400 shadow-lg">
        Close
      </button> */}
    </div>
  );
};

export default UserViewPopup;
