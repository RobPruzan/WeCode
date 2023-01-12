import { Dispatch, SetStateAction } from 'react';

import LoadingPost from './LoadingPost';
import { PostContent } from '../../../../services/connections';
import { PostedContent } from './PostedContent';

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
  console;
  return (
    <>
      {isPostLoading && (
        <div className="flex flex-col items-center">
          <LoadingPost />
          <LoadingPost />
          <LoadingPost />
          <LoadingPost />
          <LoadingPost />
          <LoadingPost />
          <LoadingPost />
        </div>
      )}
      {postedContent.map((singlePostedContent, idx) => (
        <PostedContent
          className="mx-5 mb-5 "
          keyValue={idx}
          {...{ singlePostedContent }}
        />
      ))}
    </>
  );
};
