import { Card } from '@mui/material';
import React from 'react';
import { PostContent as PostInfo } from '../../../services/connections';
export type PostedContentProps = {
  className?: string;
  postInfo: PostInfo;
};
export const PostedContent = ({ className, postInfo }: PostedContentProps) => {
  return (
    <Card className={className} sx={{ height: '10vh' }}>
      {postInfo.content}
    </Card>
  );
};
