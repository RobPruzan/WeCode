import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
export type UpDownVotingProps = {
  setUpVotes: Dispatch<SetStateAction<number>>;
  upVotes: number;
};
export const UpDownVoting = ({ upVotes, setUpVotes }: UpDownVotingProps) => {
  return (
    <>
      {/* UPVOTES DOWNVOTES HAS TO BE ON THE POSTEDCONTENT LEVEL */}
      {/* <ThumbUpIcon />
      <ThumbDownIcon/> */}
      {/* thumbs up and down but they turn to click pointers on hover */}
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
