import { Comment } from './Comment';
import { CommentType } from '../../../../../services/connections';
import React from 'react';

export type CommentsProps = {
  comments: CommentType[];
};

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className="flex flex-col">
      {comments.map(comment => (
        <Comment key={comment.id} />
      ))}
    </div>
  );
};

export default Comments;
