import React, { Dispatch, SetStateAction, useState } from 'react';
import { User, UserMinimal } from '../../services/connections';

import UserViewPopup from './UserViewPopup';
import { useFollowUserAction } from '../../hooks/UserHooks/useFollowUserAction';
import { useGetFollowers } from '../../hooks/UserHooks/useGetFollowers';
import { useGetFollowing } from '../../hooks/UserHooks/useGetFollowing';

export type UserConnectionTypes = 'followers' | 'following' | 'friends';
export type PopupManager = {
  [key in UserConnectionTypes]: boolean;
};
export type UserConnectionsProps = {
  followers?: User[] | null | undefined;
  following?: User[] | null | undefined;
  currentUser?: User | null;
  setSelectedUser: Dispatch<SetStateAction<UserMinimal | null | undefined>>;
  selectedUser: UserMinimal | null | undefined;
};

const UserConnections = ({
  currentUser,
  followers,
  following,
  setSelectedUser,
  selectedUser,
}: UserConnectionsProps) => {
  const [showUserPopUp, setShowUserPopUp] = useState<PopupManager>();
  const [popupX, setPopupX] = useState(0);
  const [popupY, setPopupY] = useState(0);

  return (
    <div className="flex justify-evenly items-center h-full border-x-2 border-y-2 border-neon-blue rounded-lg p-4">
      <div className="flex justify-center items-center w-full h-full text-center ">
        <div className="  col-span-1 text-center flex items-center justify-center">
          <button>
            <p
              onClick={event => {
                setPopupX(event.clientX);
                setPopupY(event.clientY);
                setShowUserPopUp({
                  followers: !showUserPopUp?.followers,
                  following: false,
                  friends: false,
                });
              }}
              className="text-neon-blue hover:text-white m-0 p-0 text-2xl cursor-pointer hover:font-semibold"
            >
              Followers
            </p>
          </button>

          {showUserPopUp?.followers && (
            <UserViewPopup
              setSelectedUserId={setSelectedUser}
              users={followers}
              setShowUserPopUp={setShowUserPopUp}
              popupX={popupX}
              popupY={popupY}
              userType="followers"
            />
          )}
        </div>
        <div className=" text-white font-extrabold text-2xl mx-2 ">
          {followers?.length ?? 0}
        </div>
      </div>
      <h3>{selectedUser?.label}</h3>
      <div className="flex justify-center items-center w-full h-full text-center ">
        <div className=" text-2xl col-span-1 text-center flex items-center justify-center">
          <button>
            <p
              onClick={event => {
                setPopupX(event.clientX);
                setPopupY(event.clientY);
                setShowUserPopUp({
                  followers: false,
                  following: !showUserPopUp?.following,
                  friends: false,
                });
              }}
              className="text-neon-blue hover:text-white m-0 p-0 text-2xl cursor-pointer hover:font-semibold"
            >
              Following
            </p>
          </button>

          {showUserPopUp?.following && (
            <UserViewPopup
              setShowUserPopUp={setShowUserPopUp}
              setSelectedUserId={setSelectedUser}
              users={following}
              popupX={popupX}
              popupY={popupY}
              userType="following"
            />
          )}
        </div>
        <div className=" text-white font-extrabold text-2xl mx-2 ">
          {following?.length ?? 0}
        </div>
      </div>
      {/* <div className="flex justify-center items-center w-full h-full text-center ">
        <div className=" text-2xl col-span-1 text-center flex items-center justify-center">
          <button>
            <p
              onClick={event => {
                setPopupX(event.clientX);
                setPopupY(event.clientY);
                setShowUserPopUp({
                  followers: false,
                  following: false,
                  friends: !showUserPopUp?.friends,
                });
              }}
              className="text-neon-blue hover:text-white m-0 p-0 text-2xl cursor-pointer hover:font-semibold"
            >
              Friends
            </p>
          </button>

          {showUserPopUp?.friends && (
            <UserViewPopup popupX={popupX} popupY={popupY} userType="friends" />
          )}
        </div>
        <div className=" text-white font-extrabold text-2xl mx-2 ">
          {currentUser?.friends?.length ?? 0}
        </div>
      </div> */}
    </div>
  );
};

export default UserConnections;
