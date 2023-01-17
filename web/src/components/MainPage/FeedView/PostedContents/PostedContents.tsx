import { Dispatch, SetStateAction, useMemo } from 'react';

import LoadMore from './PostedActions/LoadMore';
import LoadingPost from './LoadingPost';
import { PostContent } from '../../../../services/connections';
import { PostedContent } from './PostedContent';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';

export type PostedContentsProps = {
  className?: string;
  postedContent: PostContent[];
  isPostLoading: boolean;
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
};
export const PostedContents = ({
  className,
  postedContent,
  isPostLoading,
  setPostedContent,
}: PostedContentsProps) => {
  const amountOfPosts = useMemo(() => postedContent.length, [postedContent]);
  const postLoadingState = useSelector(
    ({ postLoadingState }: RootState) => postLoadingState
  );

  return (
    <>
      {isPostLoading && (
        <div className="flex flex-col items-center">
          <LoadingPost key="loading post 1" />
          <LoadingPost key="loading post 2" />
          <LoadingPost key="loading post 3" />
          <LoadingPost key="loading post 4" />
          <LoadingPost key="loading post 5" />
          <LoadingPost key="loading post 6" />
          <LoadingPost key="loading post 7" />
        </div>
      )}
      {postLoadingState.loading && (
        <div className="flex justify-center items-center mx-2 ">
          <LoadingPost key="loading post top" />
        </div>
      )}
      {postedContent.map((singlePostedContent, idx) => (
        <PostedContent
          className="mx-5 mb-5 "
          key={`PostedContent: ${idx}`}
          setPostedContent={setPostedContent}
          postedContent={postedContent}
          {...{ singlePostedContent }}
        />
      ))}
      {amountOfPosts >= 25 && <LoadMore />}
    </>
  );
};
