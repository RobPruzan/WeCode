import React, { useEffect, useState } from 'react';

import { ChallengeInfo } from './ChallengesCol';
import LinearProgress from '@mui/material/LinearProgress';
import Radio from '@material-ui/core/Radio';
import green from '@material-ui/core/colors/green';

export type ChallengeQuizProps = {
  activeQuiz: number;
  challenge: ChallengeInfo;
  handleExitChallenge: () => void;
};
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

const ChallengeQuiz = ({
  activeQuiz,
  challenge,
  handleExitChallenge,
}: ChallengeQuizProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 100) {
        setCount(count + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [count]);
  console.log(count);
  return (
    <>
      <LinearProgress variant="determinate" value={count} />
      <p className="h3">{challenge.title}</p>
      <p className="h3">{challenge.description}</p>
      <div className=""></div>
      <button
        onClick={handleExitChallenge}
        className="bg-neon-blue hover:bg-blue-500 rounded-lg shadow-lg text-white p-2 m-2"
      >
        exit
      </button>
    </>
  );
};

export default ChallengeQuiz;
