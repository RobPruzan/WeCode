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

const correctAnswer = 'b';
const ChallengeQuiz = ({
  activeQuiz,
  challenge,
  handleExitChallenge,
}: ChallengeQuizProps) => {
  const [count, setCount] = useState(0);
  const [selection, setSelection] = useState<'a' | 'b' | 'c' | 'd'>();
  const [correct, setCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 300) {
        setCount(count + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      {correct === null ? (
        <>
          <LinearProgress
            color="info"
            variant="determinate"
            value={count / 3}
          />
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
            <FormControl
              component="fieldset"
              onSubmit={() => {
                if (selection === correctAnswer) {
                  setCorrect(true);
                } else {
                  setCorrect(false);
                }
              }}
            >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={selection}
                onChange={e =>
                  setSelection(e.target.value as 'a' | 'b' | 'c' | 'd')
                }
              >
                <FormControlLabel
                  className="mt-2"
                  value="a"
                  control={<Radio disableRipple={true} />}
                  label="Test question 1"
                />
                <FormControlLabel
                  className="mt-2"
                  value="b"
                  control={<Radio />}
                  label="Test question 2"
                />
                <FormControlLabel
                  className="mt-2"
                  value="c"
                  control={<Radio />}
                  label="Test question 3"
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
              onClick={() => {
                if (selection === correctAnswer) {
                  setCorrect(true);
                } else {
                  setCorrect(false);
                }
              }}
              className="bg-neon-blue hover:bg-sky-500 rounded-lg shadow-lg text-white p-2 w-50 "
            >
              Submit
            </button>
          </div>
        </>
      ) : correct ? (
        <>
          <p className="text-green-500">Dub dub dub win win win</p>
          <button
            onClick={handleExitChallenge}
            className="bg-red-500 hover:bg-red-700 rounded-lg shadow-lg text-white p-2 w-50 mr-2"
          >
            Exit
          </button>
        </>
      ) : (
        <>
          <p className="text-red-500">You suk loser</p>
          <button
            onClick={handleExitChallenge}
            className="bg-red-500 hover:bg-red-700 rounded-lg shadow-lg text-white p-2 w-50 mr-2"
          >
            Exit
          </button>
        </>
      )}
    </>
  );
};

export default ChallengeQuiz;
