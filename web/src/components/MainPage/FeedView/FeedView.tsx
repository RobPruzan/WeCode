import { PUBLIC_SPACE } from '../Options/JoinSpace/JoinSpace';
import { PostContent } from '../../../services/connections';
import { PostTabs } from './Post/Tabs/PostTabs';
import { PostedContents } from './PostedContents/PostedContents';
import { RootState } from '../../../redux/store';
import { useGetPosts } from '../../../hooks/PostHooks/useGetPosts';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const FeedView = () => {
  const [postedContent, setPostedContent] = useState<PostContent[]>([]);

  const space = useSelector((spaceState: RootState) => spaceState.spaceState);

  const { posts, postsError, postsIsLoading, postsIsError, refetchPosts } =
    useGetPosts(space.currentSpaceId ?? PUBLIC_SPACE, setPostedContent);
  const queryClient = useQueryClient();

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
    </>
  );
};

export default FeedView;
