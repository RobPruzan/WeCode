import { CommentContent } from '../../../../../services/connections';
import React from 'react';
import { UseQueryResult } from 'react-query';

type Props = {
  getCommentsQuery: UseQueryResult<CommentContent[], unknown>;
};

const Comment = ({ getCommentsQuery }: Props) => {
  return (
    <>
      {getCommentsQuery.isSuccess &&
        getCommentsQuery.data.map(comment => (
          <div className="p-3 mt-4 border-2 border-neon-blue rounded-lg shadow-xl ">
            <p className="h5">{comment.user.name}</p>
            <hr />
            {comment.content}
          </div>
        ))}
    </>
  );
};

export default Comment;
