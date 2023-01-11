import { useEffect, useState } from 'react';

import { LinearProgress } from '@mui/material';

export type ChallengeProgressBarProps = {
  handleAnswer: VoidFunction;
  correct: null | boolean;
};

const ChallengeProgressBar = ({
  handleAnswer,
  correct,
}: ChallengeProgressBarProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 200) {
        setCount(count + 1);
      } else {
        handleAnswer();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  return correct === null ? (
    <LinearProgress color="info" variant="determinate" value={count / 2} />
  ) : null;
};

export default ChallengeProgressBar;
