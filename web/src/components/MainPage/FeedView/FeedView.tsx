import {
  AiFillEdit,
  AiFillSketchCircle,
  AiOutlineCiCircle,
} from 'react-icons/ai';
import { BsCircle, BsCircleSquare } from 'react-icons/bs';
import WeCode, { PostContent } from '../../../services/connections';
import { useEffect, useState } from 'react';

import { PUBLIC_SPACE } from '../Options/JoinSpace/JoinSpace';
import { PostTabs } from './Post/Tabs/PostTabs';
import { PostedContents } from './PostedContents/PostedContents';
import { RootState } from '../../../redux/store';
import { SiCircleci } from 'react-icons/si';
import { useGetPosts } from '../../../hooks/PostHooks/useGetPosts';
import { useSelector } from 'react-redux';
import { useUsersQuery } from '../../../hooks/useUsersQuery';

const FeedView = () => {
  const [postedContent, setPostedContent] = useState<PostContent[]>([]);
  // const [postButtonToggled, setPostButtonToggled] = useState(false);
  const space = useSelector((spaceState: RootState) => spaceState.spaceState);

  const { posts, postsError, postsIsLoading, postsIsError, refetchPosts } =
    useGetPosts(space.currentSpaceId ?? PUBLIC_SPACE, setPostedContent);

  return (
    <>
      <PostTabs
        className="mx-5 mt-3 mb-5"
        setPostedContent={setPostedContent}
        postedContent={postedContent}
        isPostLoading={postsIsLoading}
      />

      <PostedContents
        className="mx-5"
        postedContent={postedContent}
        setPostedContent={setPostedContent}
        isPostLoading={postsIsLoading}
      />
      {/* {postButtonToggled ? (
        <div
          style={{
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <div className="flex justify-center items-center h-full w-full">
            yo yo yo
            <button
              className="p-3 rounded-lg text-semibold text-white bg-neon-blue"
              onClick={() => setPostButtonToggled(!postButtonToggled)}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <AiFillEdit
          onClick={() => setPostButtonToggled(!postButtonToggled)}
          size={50}
          className=" shadow-2xl cursor-pointer"
          style={{
            zIndex: 30,

            position: 'fixed',
            // top: 0,
            right: 20,
            bottom: 20,
            // left: 0,
          }}
        />
      )} */}
    </>
  );
};

export default FeedView;
