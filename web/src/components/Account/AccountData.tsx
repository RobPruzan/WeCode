import { PostContent, User } from '../../services/connections';
import React, { ChangeEvent } from 'react';

import { CustomTextField } from '../CustomTextField';
import { PostedContents } from '../MainPage/FeedView/PostedContents/PostedContents';
import { Spinner } from 'react-bootstrap';
import { useFollowUserAction } from '../../hooks/UserHooks/useFollowUserAction';

export type AccountDataProps = {
  userPosts: PostContent[] | undefined;
  handleUserSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  visibleUsers: User[] | undefined;
  selectedUserName: string | null;
  buttonIndex: number;
  setButtonIndex: React.Dispatch<React.SetStateAction<number>>;

  following: User[] | null | undefined;
  followers: User[] | null | undefined;
  currentUser: User | null;
};

const AccountData = ({
  buttonIndex,
  currentUser,
  followers,
  following,
  handleUserSearch,
  selectedUserName,
  setButtonIndex,

  userPosts,
  visibleUsers,
}: AccountDataProps) => {
  const followUserMutation = useFollowUserAction('follow');
  const unfollowMutation = useFollowUserAction('unfollow');

  const handleFollow = (user_id: number, user_to_follow_id: number) => {
    followUserMutation.mutate({
      user_id: user_id,
      user_id_to_act_on: user_to_follow_id,
    });
  };

  const handleUnfollow = (user_id: number, user_to_unfollow_id: number) => {
    unfollowMutation.mutate({
      user_id: user_id,
      user_id_to_act_on: user_to_unfollow_id,
    });
  };
  return (
    <div className="grid grid-cols-2 h-screen overflow-hidden md:overflow-y-auto ">
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
                    ) : followUserMutation.isLoading &&
                      buttonIndex === index ? (
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
  );
};

export default AccountData;
