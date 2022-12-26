import { Card } from '@mui/material';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { PostContent as PostInfo } from '../../../../services/connections';

import CommentIcon from '@mui/icons-material/Comment';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { UpDownVoting } from './UpDownVoting';

const cardStyle = {
  color: 'white',
  background: '#141414',
  border: '1px solid #43bbff',
  borderRadius: '10px',
  padding: '10px',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
};
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
  const [usedVote, setUsedVote] = useState(false);
  const [upOrDownVote, setUpOrDownVote] = useState<'up' | 'down' | null>(null);
  const handleUpVote = () => {
    console.log('is used vote', usedVote);
    // if (!usedVote || upOrDownVote === 'down') {
    //   setUpVotes(prev => prev + 1);
    //   setUsedVote(true);
    //   setUpOrDownVote('up');
    // }
    if (usedVote) {
      if (upOrDownVote === 'up') {
        setUpVotes(prev => prev - 1);
        setUsedVote(false);
        setUpOrDownVote(null);
      }
      if (upOrDownVote === 'down') {
        setUpVotes(prev => prev + 1);
        setUsedVote(true);
        setUpOrDownVote('up');
      }
    } else {
      setUpVotes(prev => prev + 1);
      setUsedVote(true);
      setUpOrDownVote('up');
    }
  };
  const handleDownVote = () => {
    if (usedVote) {
      if (upOrDownVote === 'down') {
        setUpVotes(prev => prev + 1);
        setUsedVote(false);
        setUpOrDownVote(null);
      }
      if (upOrDownVote === 'up') {
        setUpVotes(prev => prev - 1);
        setUsedVote(true);
        setUpOrDownVote('down');
      }
    } else {
      setUpVotes(prev => prev - 1);
      setUsedVote(true);
      setUpOrDownVote('down');
    }
  };
  return (
    <div key={`PostedContent: ${keyValue}`}>
      <Card sx={cardStyle} className={className}>
        <div style={{ float: 'right', marginLeft: '1em' }}>
          <UpDownVoting
            upVotes={upVotes}
            setUpVotes={setUpVotes}
            disabled={!!usedVote}
            handleUpVote={handleUpVote}
            handleDownVote={handleDownVote}
            upOrDownVote={upOrDownVote}
          />
        </div>
        {singlePostedContent.content}
        <hr />
        {singlePostedContent.code && (
          <>
            <p>{singlePostedContent.langauge}</p>
            <SyntaxHighlighter
              language={singlePostedContent.langauge}
              style={atomDark}
            >
              {singlePostedContent.code}
            </SyntaxHighlighter>
          </>
        )}
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => alert('You tried to comment')}
        >
          <CommentIcon />
        </div>
      </Card>
    </div>
  );
};
