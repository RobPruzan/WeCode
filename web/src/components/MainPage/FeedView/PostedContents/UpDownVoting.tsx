import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Dispatch, SetStateAction, useState } from 'react';
export type UpDownVotingProps = {
  setUpVotes: Dispatch<SetStateAction<number>>;
  upVotes: number;
};
export const UpDownVoting = ({ upVotes, setUpVotes }: UpDownVotingProps) => {
  return (
    <>
      <p className="h4">{upVotes}</p>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setUpVotes(prev => prev + 1)}
      >
        <ThumbUpIcon color="primary" />
      </div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setUpVotes(prev => prev - 1)}
      >
        {' '}
        <ThumbDownIcon color="primary" />
      </div>
    </>
  );
};
