import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Card } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Comments } from './PostedActions/Comments';
import ExpandIcon from '@mui/icons-material/Expand';
import { PostContent as PostInfo } from '../../../../services/connections';
import { RootState } from '../../../../redux/store';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { UpDownVoting } from './UpDownVoting';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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
  const user = useSelector(({ userState }: RootState) => userState.user);
  const handleUpVote = () => {
    if (usedVote) {
      if (upOrDownVote === 'up') {
        setUpVotes(prev => prev - 1);
        setUsedVote(false);
        setUpOrDownVote(null);
      }
      if (upOrDownVote === 'down') {
        setUpVotes(prev => prev + 2);
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
        setUpVotes(prev => prev - 2);
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
      {/* <div
        className="border-2 text-center border-white rounded-full  
      // min width 40 px

       min-w-fit h-10 "
      >
        <p className="w-10">{user?.name[0]}</p>
      </div> */}

      <Card sx={cardStyle} className={className}>
        {/* a circle float left top 0 */}

        <div style={{ float: 'right', marginLeft: '1em', marginBottom: '1em' }}>
          <UpDownVoting
            upVotes={upVotes}
            setUpVotes={setUpVotes}
            disabled={!!usedVote}
            handleUpVote={handleUpVote}
            handleDownVote={handleDownVote}
            upOrDownVote={upOrDownVote}
          />
        </div>
        <div style={{ color: 'white' }} className="mx-3">
          {singlePostedContent.content}
          {singlePostedContent.code && singlePostedContent.content && <hr />}
        </div>

        {singlePostedContent.code && (
          <div className="m-3">
            <SyntaxHighlighter
              language={singlePostedContent.langauge}
              style={atomDark}
            >
              {singlePostedContent.code}
            </SyntaxHighlighter>
            <p>{singlePostedContent.langauge?.toUpperCase()}</p>
          </div>
        )}

        <hr />

        <Comments />
      </Card>
    </div>
  );
};
