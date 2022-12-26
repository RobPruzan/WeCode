import { Card } from '@mui/material';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { PostContent as PostInfo } from '../../../../services/connections';

import CommentIcon from '@mui/icons-material/Comment';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { UpDownVoting } from './UpDownVoting';
export type PostedContentProps = {
  className?: string;
  singlePostedContent: PostInfo;
  keyValue: number;
};
export const PostedContent = ({
  className,
  singlePostedContent,
  keyValue,
}: PostedContentProps) => {
  const [upVotes, setUpVotes] = useState(0);
  return (
    <div key={`PostedContent: ${keyValue}`}>
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
          <UpDownVoting upVotes={upVotes} setUpVotes={setUpVotes} />
        </div>
        {singlePostedContent.content}
        <hr />
        {singlePostedContent.code && (
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {singlePostedContent.code}
          </SyntaxHighlighter>
        )}
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => alert('You tried to comment')}
        >
          <CommentIcon />
        </div>
      </Card>
      {/* <div style={{ clear: 'both' }}> */}
      {/* </div> */}
    </div>
  );
};
