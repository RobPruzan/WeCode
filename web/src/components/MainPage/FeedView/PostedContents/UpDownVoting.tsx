import { Dispatch, SetStateAction } from 'react';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { VoteType } from '../../../../services/connections';
import { useVoteOnPost } from '../../../../hooks/PostHooks/useVoteOnPost';

export type UpDownVotingProps = {
  upVotes: number;
  setUpVotes: Dispatch<SetStateAction<number>>;
  handleUpVote: VoidFunction;
  handleDownVote: VoidFunction;
  voteType: VoteType;
};

export const UpDownVoting = ({
  upVotes,
  handleUpVote,
  handleDownVote,
  voteType,
}: UpDownVotingProps) => {
  const getColor = (direction: VoteType) => {
    return voteType === direction ? 'white' : 'grey';
  };
  return (
    <>
      <p className="h4">{upVotes}</p>
      <div style={{ cursor: 'pointer' }} onClick={handleUpVote}>
        <ThumbUpIcon
          style={{
            fill: getColor(VoteType.UPVOTE),
          }}
        />
      </div>
      <div style={{ cursor: 'pointer' }} onClick={handleDownVote}>
        <ThumbDownIcon
          style={{
            fill: getColor(VoteType.DOWNVOTE),
          }}
        />
      </div>
    </>
  );
};
