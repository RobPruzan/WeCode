import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { CustomTextField } from '../CustomTextField';
import { FollowActionMutationParams } from '../../hooks/UserHooks/useFollowUserAction';
import { Spinner } from 'react-bootstrap';
import { UseMutationResult } from 'react-query';
import { User } from '../../services/connections';

export type UserSearchProps = {
  handleUserSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  visibleUsers: User[] | undefined;
  selectedUserName: string | null;
  buttonIndex: number;
  setButtonIndex: Dispatch<SetStateAction<number>>;
  following: User[] | null | undefined;
  currentUser: User | null;
  unfollowMutation: UseMutationResult<
    void,
    unknown,
    FollowActionMutationParams,
    unknown
  >;
  followUserMutation: UseMutationResult<
    void,
    unknown,
    FollowActionMutationParams,
    unknown
  >;
  handleUnfollow: (user_id: number, user_to_unfollow_id: number) => void;
  handleFollow: (user_id: number, user_to_follow_id: number) => void;
};

const UserSearch = ({
  buttonIndex,
  currentUser,
  following,
  handleUserSearch,
  selectedUserName,
  setButtonIndex,
  visibleUsers,
  followUserMutation,
  unfollowMutation,
  handleUnfollow,
  handleFollow,
}: UserSearchProps) => {
  return (
    <div className="col-span-2 md:col-span-1  ">
      <div className="flex flex-col h-full w-full items-center p-8">
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
          className=" w-full mt-4  border-x-2 shadow-inner border-t-gray-400 border-neon-blue p-3 overflow-y-auto "
        >
          {visibleUsers && visibleUsers.length > 0 ? (
            visibleUsers.map((otherUser, index) => (
              <>
                <div
                  key={index}
                  className="bg-zinc-900 border-x-2 shadow-lg border-x-neon-blue   w-full h-fit p-3 mt-4 grid grid-cols-2 gap-2 rounded-sm"
                >
                  {otherUser.name}
                  {following?.find(user => user.id === otherUser.id) ? (
                    unfollowMutation.isLoading && buttonIndex === index ? (
                      <button className="bg-sky-500 p-1 text-white  rounded-md ">
                        <Spinner size="sm" />
                      </button>
                    ) : (
                      <button
                        className="bg-gray-500 p-1 text-white  rounded-md hover:bg-gray-400"
                        onClick={_ => {
                          setButtonIndex(index);
                          currentUser &&
                            handleUnfollow(currentUser?.id, otherUser.id);
                        }}
                      >
                        Unfollow
                      </button>
                    )
                  ) : followUserMutation.isLoading && buttonIndex === index ? (
                    <button className="bg-sky-500 p-1 text-white  rounded-md ">
                      <Spinner size="sm" />
                    </button>
                  ) : (
                    <button
                      className="bg-neon-blue p-1 text-white  rounded-md hover:bg-sky-500 "
                      onClick={_ => {
                        setButtonIndex(index);
                        currentUser &&
                          handleFollow(currentUser?.id, otherUser.id);
                      }}
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
  );
};

export default UserSearch;
