import { useEffect, useState } from 'react';

import { LinearProgress } from '@mui/material';

const ChallengeProgressBar = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 300) {
        setCount(count + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <LinearProgress color="info" variant="determinate" value={count / 3} />
  );
};

export default ChallengeProgressBar;
