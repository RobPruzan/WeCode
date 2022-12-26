import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import WeCode, { PostContent } from '../../../services/connections';
import { PUBLIC_SPACE } from '../Options/JoinSpace/JoinSpace';
import { PostTabs } from './Post/Tabs/PostTabs';
import { PostedContents } from './PostedContents/PostedContents';

const FeedView = () => {
  const [postedContent, setPostedContent] = useState<PostContent[]>([]);
  const isPostLoading = useSelector(
    (postLoadingState: RootState) => postLoadingState.postLoadingState.loading
  );

  const space = useSelector((spaceState: RootState) => spaceState.spaceState);

  const hydrateFeed = async () => {
    const res = await WeCode.getPosts(space.currentSpaceId ?? PUBLIC_SPACE);

    setPostedContent(res.reverse());
  };

  useEffect(() => {
    hydrateFeed();
  }, [space.currentSpaceId]);

  return (
    <>
      <PostTabs
        className="mx-5 mt-3 mb-5"
        setPostedContent={setPostedContent}
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
