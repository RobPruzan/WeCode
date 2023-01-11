import WeCode, { PostContent } from '../../../services/connections';
import { useEffect, useState } from 'react';

import { PUBLIC_SPACE } from '../Options/JoinSpace/JoinSpace';
import { PostTabs } from './Post/Tabs/PostTabs';
import { PostedContents } from './PostedContents/PostedContents';
import { RootState } from '../../../redux/store';
import { useGetPosts } from '../../../hooks/PostHooks/useGetPosts';
import { useSelector } from 'react-redux';
import { useUsersQuery } from '../../../hooks/useUsersQuery';

const FeedView = () => {
  const [postedContent, setPostedContent] = useState<PostContent[]>([]);
  const isPostLoading = useSelector(
    (postLoadingState: RootState) => postLoadingState.postLoadingState.loading
  );

  const space = useSelector((spaceState: RootState) => spaceState.spaceState);

  const { posts, postsError, postsIsLoading, postsIsError, refetchPosts } =
    useGetPosts(space.currentSpaceId ?? PUBLIC_SPACE, setPostedContent);

  return (
    <>
      <PostTabs
        className="mx-5 mt-3 mb-5"
        setPostedContent={setPostedContent}
        postedContent={postedContent}
        isPostLoading={isPostLoading}
      />

      <PostedContents
        className="mx-5"
        postedContent={postedContent}
        setPostedContent={setPostedContent}
        isPostLoading={isPostLoading}
      />
    </>
  );
};

export default FeedView;
