import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { PostContent, VoteType } from '../../../../services/connections';

import { Comment } from './PostedActions/Comment';
import { RootState } from '../../../../redux/store';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { UpDownVoting } from './UpDownVoting';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import { useGetPosts } from '../../../../hooks/PostHooks/useGetPosts';
import { useSelector } from 'react-redux';
import { useVoteOnPost } from '../../../../hooks/PostHooks/useVoteOnPost';

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
  postedContent: PostContent[];
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
};

export const PostedContent = ({
  className,
  singlePostedContent,
  canComment = true,
  keyValue,
  postedContent,
  setPostedContent,
}: PostedContentProps) => {
  const [upVotes, setUpVotes] = useState(singlePostedContent.likes ?? 0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const user = useSelector(({ userState }: RootState) => userState.user);
  const voteOnPostMutation = useVoteOnPost(setPostedContent);
  const getPostsQuery = useGetPosts();
  useEffect(() => {
    setUpVotes(singlePostedContent.likes ?? 0);
    setVoteType(server_vote_type ?? VoteType.NOVOTE);
  }, [singlePostedContent]);

  const server_vote_type = useMemo(
    () =>
      singlePostedContent.liked_by?.find(
        likedBy => likedBy.user.id === user?.id
      ),
    [user, singlePostedContent.liked_by]
  )?.vote_type;

  const [voteType, setVoteType] = useState<VoteType>(
    server_vote_type ?? VoteType.NOVOTE
  );

  const voteOnPostMutationSimple = (vote_type: VoteType) => {
    if (user && singlePostedContent?.id) {
      voteOnPostMutation.mutate({
        post_id: singlePostedContent.id,
        user_id: user.id,
        vote_type: vote_type,
      });
    }
  };
  // TODO put in utils

  const handleUpVote = () => {
    if (voteType === VoteType.UPVOTE) {
      setUpVotes(prev => prev - 1);

      setVoteType(VoteType.NOVOTE);
      voteOnPostMutationSimple(VoteType.NOVOTE);
    }
    if (voteType === VoteType.DOWNVOTE) {
      setUpVotes(prev => prev + 2);

      setVoteType(VoteType.UPVOTE);
      voteOnPostMutationSimple(VoteType.UPVOTE);
    }
    if (voteType === VoteType.NOVOTE) {
      setUpVotes(prev => prev + 1);

      setVoteType(VoteType.UPVOTE);
      voteOnPostMutationSimple(VoteType.UPVOTE);
    }
  };
  const handleDownVote = () => {
    if (voteType === VoteType.DOWNVOTE) {
      setUpVotes(prev => prev + 1);

      setVoteType(VoteType.NOVOTE);
      voteOnPostMutationSimple(VoteType.NOVOTE);
    }
    if (voteType === VoteType.UPVOTE) {
      setUpVotes(prev => prev - 2);

      setVoteType(VoteType.DOWNVOTE);
      voteOnPostMutationSimple(VoteType.DOWNVOTE);
    }
    if (voteType === VoteType.NOVOTE) {
      setUpVotes(prev => prev - 1);

      setVoteType(VoteType.DOWNVOTE);
      voteOnPostMutationSimple(VoteType.DOWNVOTE);
    }
  };
  const handleThrottledVote = (handleVote: VoidFunction) => {
    if (isButtonDisabled) {
      return;
    }

    setIsButtonDisabled(true);
    handleVote();

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };
  return (
    <div key={`PostedContent: ${keyValue}`}>
      <div className={`border-2 border-neon-blue rounded-lg p-2 ${className}`}>
        <div style={{ float: 'right', marginLeft: '1em', marginBottom: '1em' }}>
          <UpDownVoting
            upVotes={upVotes}
            setUpVotes={setUpVotes}
            handleUpVote={() => handleThrottledVote(handleUpVote)}
            handleDownVote={() => handleThrottledVote(handleDownVote)}
            voteType={voteType}
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
