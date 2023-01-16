import {
  CommentContent,
  PostContent,
} from '../../../../../services/connections';

import Comment from './Comment';
import React from 'react';
import { SendComment } from './SendComment';
import { useGetComments } from '../../../../../hooks/PostHooks/useGetComments';

export type CommentsProps = {
  postId: number;
};

const Comments = ({ postId }: CommentsProps) => {
  const getCommentsQuery = useGetComments(postId);
  return (
    <div className="flex flex-col">
      <Comment getCommentsQuery={getCommentsQuery} />
    </div>
  );
};

export default Comments;
