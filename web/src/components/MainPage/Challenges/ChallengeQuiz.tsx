import { FormControl, Radio, RadioGroup } from '@mui/material';

import { Challenge } from '../../../services/connections';
import ChallengeProgressBar from './ProgressBar';
import green from '@material-ui/core/colors/green';
import { useState } from 'react';

export type ChallengeQuizProps = {
  activeQuiz: number;
  challenge: Challenge;
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
  const [selection, setSelection] = useState<number>();
  const [correct, setCorrect] = useState<boolean | null>(null);
  const handleAnswer = () => {
    if (selection === challenge.correct_answer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <>
      {correct === null ? (
        <>
          <ChallengeProgressBar handleAnswer={handleAnswer} />
          <p className="h3 mt-2">{challenge.title}</p>
          <p
            style={{
              overflowWrap: 'anywhere',
            }}
            className="border-t-2 border-custom-gray mt-2 p-2"
          >
            {challenge.question}
          </p>
          <div className="mr-auto ml-3">
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={selection}
                onChange={e => setSelection(Number(e.target.value ?? -1))}
              >
                {challenge.answers.map((answer, index) => (
                  <div className="flex items-center m-1">
                    <Radio id={`RadioQuiz${index + 1}`} value={answer.id} />
                    <label
                      className="text-start cursor-pointer"
                      htmlFor={`RadioQuiz${index + 1}`}
                    >
                      <p className="m-0 ">{answer.text.trim()}</p>
                    </label>
                  </div>
                ))}
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
              onClick={handleAnswer}
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
