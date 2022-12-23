import { Card } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  PostContent,
  PostContent as PostInfo,
} from '../../../../services/connections';
import { CodeBlock, dracula } from 'react-code-blocks';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { UpDownVoting } from './UpDownVoting';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
export type PostedContentProps = {
  className?: string;
  singlePostedContent: PostInfo;
  key: number;
};
export const PostedContent = ({
  className,
  singlePostedContent,
  key,
}: PostedContentProps) => {
  const [upVotes, setUpVotes] = useState(0);
  return (
    <div key={key}>
      <Card
        sx={{
          color: 'white',
          background: '#141414',
          border: '1px solid #43bbff',
          borderRadius: '10px',
          padding: '10px',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
        }}
        className={className}
      >
        <div style={{ float: 'right', marginLeft: '1em' }}>
          {' '}
          <UpDownVoting upVotes={upVotes} setUpVotes={setUpVotes} />
        </div>
        {singlePostedContent.content}
        <hr />
        {singlePostedContent.code && (
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {singlePostedContent.code}
          </SyntaxHighlighter>
        )}
      </Card>
      {/* <div style={{ clear: 'both' }}> */}
      {/* </div> */}
    </div>
  );
};