import { BsCircle, BsPlusCircle, BsXCircle } from 'react-icons/bs';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { AnswerMinimal } from '../../../../services/connections';
import { ChallengeCreate } from './CreateChallenge';
import { CustomTextField } from '../../../CustomTextField';
import { Radio } from '@mui/material';
import { SiCircle } from 'react-icons/si';

const NO_CORRECT_ANSWERS = -1;

export type CreateAnswersProps = {
  setChallengeInfo: Dispatch<SetStateAction<ChallengeCreate>>;
  challengeInfo: ChallengeCreate;
};
const CreateAnswers = ({
  challengeInfo,
  setChallengeInfo,
}: CreateAnswersProps) => {
  const maxedAnswers = challengeInfo.answers.length >= 4;
  return (
    <div className="flex flex-col p-3 border-2 w-9/12 border-opacity-30 hover:border-opacity-100 border-neon-blue mt-3 rounded-lg overflow-y-scroll mb-3">
      <div className="flex items-center justify-center">
        {challengeInfo.answers.length === 0 && (
          <p className="text-center m-0">Answers</p>
        )}
        <button className="ml-auto">
          <BsPlusCircle
            className={` ${
              maxedAnswers
                ? 'fill-gray-400 cursor-default'
                : ' cursor-pointer fill-gray-300'
            }  hover:fill-gray-400 ml-auto`}
            onClick={() => {
              if (!maxedAnswers) {
                setChallengeInfo(prev => ({
                  ...prev,
                  answers: [...prev.answers, { text: '' }],
                }));
              }
            }}
            size={30}
          />
        </button>
      </div>

      {challengeInfo.answers.map((answer, index) => (
        <div className="flex items-center justify-center mt-1">
          <CustomTextField
            label="Answer"
            className="w-9/12"
            handleChange={e => {
              const newAnswers = [...challengeInfo.answers];
              newAnswers[index].text = e.target.value;
              setChallengeInfo(prev => ({
                ...prev,
                answers: newAnswers,
              }));
            }}
            value={answer.text}
          />
          <Radio
            checked={index === challengeInfo.correct_answer}
            onClick={() => {
              // setCorrectAnswer(index);
              setChallengeInfo(prev => ({
                ...prev,
                correct_answer: index,
              }));
            }}
          />
          <button className="ml-auto">
            <BsXCircle
              className="bg-text-neon-blue cursor-pointer hover:fill-sky-500 "
              onClick={() => {
                if (challengeInfo.answers.length === 1) {
                  setChallengeInfo(prev => ({
                    ...prev,
                    correct_answer: NO_CORRECT_ANSWERS,
                  }));
                }
                setChallengeInfo(prev => ({
                  ...prev,
                  answers: prev.answers.filter((_, i) => i !== index),
                }));
              }}
              size={30}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CreateAnswers;
