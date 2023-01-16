import { PopupManager, UserConnectionTypes } from './UserConnections';
import React, { Dispatch, SetStateAction, useState } from 'react';
import WeCode, { User, UserMinimal } from '../../services/connections';

import { BsXCircle } from 'react-icons/bs';
import { RootState } from '../../redux/store';
import { useGetFollowers } from '../../hooks/UserHooks/useGetFollowers';
import { useGetFollowing } from '../../hooks/UserHooks/useGetFollowing';
import { useSelector } from 'react-redux';

export type UserViewPopupProps = {
  users: User[] | null | undefined;
  userType: UserConnectionTypes;
  popupX: number;
  popupY: number;
  setSelectedUserId: Dispatch<SetStateAction<UserMinimal | null | undefined>>;
  setShowUserPopUp: Dispatch<SetStateAction<PopupManager | undefined>>;
};

const UserViewPopup = ({
  userType,
  users,
  popupX,
  popupY,
  setSelectedUserId,
  setShowUserPopUp,
}: UserViewPopupProps) => {
  const currUserId = useSelector(
    ({ userState }: RootState) => userState.user?.id
  );

  WeCode.getFollowers;
  return (
    <div style={{ top: `${popupY}px`, left: `${popupX}px` }}>
      <div className="bg-custom-dark-gray w-60 p-4 absolute rounded-lg shadow-md overflow-auto flex flex-col justify-center items-center z-40 h-56 border-2 border-white ">
        {users?.map(user => (
          <button
            onClick={e => {
              setShowUserPopUp(undefined);
              setSelectedUserId({ id: user.id, label: user.name });
            }}
            className="w-full"
          >
            <div className="flex flex-row px-4 bg-zinc-900 justify-center items-center border-x-2 border-x-neon-blue w-full my-4 shadow-lg hover:bg-slate-800 cursor-pointer">
              <p className="text-xl font-bold">{user.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserViewPopup;
