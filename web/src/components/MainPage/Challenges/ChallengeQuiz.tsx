import React, { useEffect, useState } from 'react';

import LinearProgress from '@mui/material/LinearProgress';

export type ChallengeQuizProps = {
  activeQuiz: number;
  title: string;
  handleExitChallenge: () => void;
};
const ChallengeQuiz = ({
  activeQuiz,
  handleExitChallenge,
  title,
}: ChallengeQuizProps) => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    setTimer(0);
    const timer = setInterval(() => {
      setTimer(prev => {
        return prev + 1;
      });
    }, 100);
  }, [activeQuiz]);
  return (
    <div>
      <LinearProgress variant="determinate" value={timer} />
      <p className="h3">{title}</p>
      <button
        onClick={handleExitChallenge}
        className="bg-neon-blue hover:bg-blue-500 rounded-lg shadow-lg text-white p-2 m-2"
      >
        exit
      </button>
    </div>
  );
};

export default ChallengeQuiz;
