import { AnswerMinimal, Challenge } from '../../../../services/connections';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import CreateAnswers from './CreateAnswers';
import { CustomTextField } from '../../../CustomTextField';
import { Spinner } from 'react-bootstrap';
import { useCreateChallenge } from '../../../../hooks/ChallengeHooks/useCreateChallenge';

export type CreateChallengeProps = {
  toggleAddChallenge: boolean;
  setToggleAddChallenge: Dispatch<SetStateAction<boolean>>;
};
const DEFAULT_CHALLENGE: ChallengeCreate = {
  title: '',
  description: '',
  difficulty: 1,
  answers: [],
  correct_answer: -1,
  question: '',
};

export type ChallengeCreate = {
  title: string;
  description: string;
  difficulty: number;
  answers: AnswerMinimal[];
  correct_answer: number;
  question: string;
};

const CreateChallenge = ({
  toggleAddChallenge,
  setToggleAddChallenge,
}: CreateChallengeProps) => {
  const [challengeInfo, setChallengeInfo] = useState(DEFAULT_CHALLENGE);
  const {
    createChallenge,
    createChallengeError,
    createChallengeIsError,
    createChallengeIsLoading,
    createChallengeIsSuccess,
  } = useCreateChallenge(() => {
    setChallengeInfo(DEFAULT_CHALLENGE);
    setToggleAddChallenge(false);
  });

  const handleChallengeInfoChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof Challenge
  ) => {
    setChallengeInfo({ ...challengeInfo, [key]: event.target.value });
  };
  return toggleAddChallenge ? (
    <div
      className=""
      style={{
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            height: '90vh',
            marginLeft: '40px',
          }}
          className="border-2 border-neon-blue w-2/5   bg-custom-dark-gray rounded-md flex flex-col items-center"
        >
          <CustomTextField
            className="mt-5 w-9/12"
            label={'Title'}
            handleChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChallengeInfoChange(event, 'title')
            }
            value={challengeInfo?.title ?? ''}
          />
          <CustomTextField
            rows={2}
            isMultiline={true}
            className="mt-3 w-9/12"
            label={'Description'}
            handleChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChallengeInfoChange(event, 'description')
            }
            value={challengeInfo?.description ?? ''}
          />
          <CustomTextField
            value={String(challengeInfo.difficulty)}
            className="mt-3 w-9/12"
            handleChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (
                Number(event.target.value) > 0 &&
                Number(event.target.value) <= 5
              ) {
                handleChallengeInfoChange(event, 'difficulty');
              }
            }}
            label="Difficulty"
            type="number"
          />

          <CustomTextField
            rows={3}
            isMultiline={true}
            className="mt-3 w-9/12"
            label={'Question'}
            handleChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChallengeInfoChange(event, 'question')
            }
            value={challengeInfo?.question ?? ''}
          />

          <CreateAnswers
            challengeInfo={challengeInfo}
            setChallengeInfo={setChallengeInfo}
          />
          <div className="flex justify-evenly w-full mt-auto">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold w-52 mb-3 py-2 px-4 rounded mt-auto"
              onClick={() => setToggleAddChallenge(false)}
            >
              Close
            </button>
            <button
              disabled={createChallengeIsLoading}
              className="bg-neon-blue hover:bg-sky-400 text-white font-semibold w-52 mb-3 py-2 px-4 rounded mt-auto"
              onClick={() => {
                createChallenge(challengeInfo);
              }}
            >
              {createChallengeIsLoading ? '...' : 'Create Challenge'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateChallenge;
