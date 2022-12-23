import { Card } from '@mui/material';
import React, { useState } from 'react';
import { PostContent } from '../../../../services/connections';
import { PostedContent } from './PostedContent';

export type PostedContentsProps = {
  className?: string;
  postedContent: PostContent[];
  isPostLoading: boolean;
};
export const PostedContents = ({
  className,
  postedContent,
  isPostLoading,
}: PostedContentsProps) => {
  return (
    <>
      {postedContent.map((singlePostedContent, idx) => (
        <PostedContent
          className="mx-5 mb-5"
          key={idx}
          {...{ singlePostedContent }}
        />
      ))}
    </>
  );
};
