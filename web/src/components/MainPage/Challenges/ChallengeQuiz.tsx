import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ChallengeInfo } from './ChallengesCol';
import LinearProgress from '@mui/material/LinearProgress';
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
      if (count < 500) {
        setCount(count + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [count]);
  console.log(count);
  return (
    <>
      <LinearProgress variant="determinate" value={count / 5} />
      <p className="h3 mt-2">{challenge.title}</p>
      <p
        style={{
          overflowWrap: 'anywhere',
        }}
        className="border-t-2 border-custom-gray mt-2 p-2"
      >
        {challenge.description}
      </p>
      <div className="mr-auto ml-3">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              className="mt-2"
              value="female"
              control={<Radio disableRipple={true} />}
              label="Female"
            />
            <FormControlLabel
              className="mt-2"
              value="male"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              className="mt-2"
              value="other"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="flex mt-3">
        <button
          onClick={handleExitChallenge}
          className="bg-red-500 hover:bg-red-700 rounded-lg shadow-lg text-white p-2 w-50 mr-2"
        >
          Exit
        </button>
        <button
          onClick={handleExitChallenge}
          className="bg-neon-blue hover:bg-sky-500 rounded-lg shadow-lg text-white p-2 w-50 "
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default ChallengeQuiz;
