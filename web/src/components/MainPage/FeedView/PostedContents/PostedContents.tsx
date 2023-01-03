import { Dispatch, SetStateAction } from 'react';
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
  return (
    <>
      {postedContent.map((singlePostedContent, idx) => (
        <PostedContent
          className="mx-5 mb-5 overflow-y-scroll"
          keyValue={idx}
          {...{ singlePostedContent }}
        />
      ))}
    </>
  );
};
