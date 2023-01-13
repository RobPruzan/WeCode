import { Comment } from './PostedActions/Comment';
import { PostContent } from '../../../../services/connections';
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
  canComment?: boolean;
  singlePostedContent: PostContent;
  keyValue: number | string;
};
export const PostedContent = ({
  className,
  singlePostedContent,
  canComment = true,
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
      <div className={`border-2 border-neon-blue rounded-lg p-2 ${className}`}>
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
              language={singlePostedContent.language}
              style={atomDark}
            >
              {singlePostedContent.code}
            </SyntaxHighlighter>
            <p>{singlePostedContent.language?.toUpperCase()}</p>
          </div>
        )}

        <hr />
        {canComment && <Comment />}
      </div>
    </div>
  );
};
