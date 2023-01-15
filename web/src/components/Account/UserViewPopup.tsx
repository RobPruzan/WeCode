import WeCode, { User } from '../../services/connections';

import React from 'react';
import { UserConnectionTypes } from './UserConnections';

export type UserViewPopupProps = {
  users: User[] | null | undefined;
  userType: UserConnectionTypes;
  popupX: number;
  popupY: number;
};
const UserViewPopup = ({
  userType,
  users,
  popupX,
  popupY,
}: UserViewPopupProps) => {
  WeCode.getFollowers;
  return (
    <div
      className="bg-custom-dark-gray p-4 absolute rounded-lg shadow-md overflow-auto flex flex-col justify-center items-center z-40 h-56 border-2 border-white"
      style={{ top: `${popupY}px`, left: `${popupX}px` }}
    >
      <p className="text-2xl font-bold">{userType}</p>
      {users?.map(user => (
        <div className="flex flex-row bg-zinc-900 justify-center items-center border-x-2 border-x-neon-blue w-full my-4 shadow-lg ">
          <p className="text-xl font-bold">{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserViewPopup;
