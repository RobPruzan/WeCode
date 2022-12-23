import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import WeCode, { PostContent } from '../../../services/connections';
import { PostTabs } from './Post/Tabs/PostTabs';
import { PostedContents } from './PostedContents/PostedContents';
import { useQuery } from 'react-query';

const FeedView = () => {
  const [postedContent, setPostedContent] = useState<PostContent[]>([]);
  const isPostLoading = useSelector(
    (postLoadingState: RootState) => postLoadingState.postLoadingState.loading
  );

  const space = useSelector((spaceState: RootState) => spaceState.spaceState);

  const hydrateFeed = async () => {
    const res = await WeCode.getPosts(space.spaceName);
    setPostedContent(res.reverse());
  };

  useEffect(() => {
    hydrateFeed();
  }, [space.spaceName]);

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
        isPostLoading={isPostLoading}
      />
    </>
  );
};

export default FeedView;
