import { Dispatch, SetStateAction } from 'react';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
export type UpDownVotingProps = {
  upVotes: number;
  setUpVotes: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
  handleUpVote: VoidFunction;
  handleDownVote: VoidFunction;
  upOrDownVote: 'up' | 'down' | null;
};

export const UpDownVoting = ({
  upVotes,
  setUpVotes,
  disabled,
  handleUpVote,
  handleDownVote,
  upOrDownVote,
}: UpDownVotingProps) => {
  const getColor = (direction: 'up' | 'down') => {
    if (disabled) {
      if (upOrDownVote === direction) {
        return 'white';
      } else {
        return 'grey';
      }
    } else {
      return 'grey';
    }
  };
  return (
    <>
      <p className="h4">{upVotes}</p>
      <div style={{ cursor: 'pointer' }} onClick={handleUpVote}>
        <ThumbUpIcon
          style={{
            fill: getColor('up'),
          }}
        />
      </div>
      <div style={{ cursor: 'pointer' }} onClick={handleDownVote}>
        <ThumbDownIcon
          style={{
            fill: getColor('down'),
          }}
        />
      </div>
    </>
  );
};
