import { Card } from '@mui/material';
import React, { useState } from 'react';
import { PostContent } from '../../../services/connections';
import { PostedContent } from './PostedContent';

export type PostedContentsProps = {
  className?: string;
};
export const PostedContents = ({ className }: PostedContentsProps) => {
  const [postedContent, setPostedContent] = useState<PostContent[]>([
    { content: 'test' },
  ]);
  return (
    // <Card sx={hei}>stuff inside here</Card>
    // card with height of 10% of screen
    <>
      {postedContent.map(postInfo => (
        <PostedContent className="mx-5" {...{ postInfo }} />
      ))}
    </>
  );
};
