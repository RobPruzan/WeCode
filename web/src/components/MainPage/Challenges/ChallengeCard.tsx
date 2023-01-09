import {
  ChallengeInfo,
  DummyCodingChallenges,
  NO_ACTIVE_QUIZES,
  difficultyMap,
} from './ChallengesCol';
import { DiPython, DiReact } from 'react-icons/di';
import React, { Dispatch, SetStateAction, useState } from 'react';

import ChallengeQuiz from './ChallengeQuiz';
import { SiTypescript } from 'react-icons/si';

export type ChallengeCardProps = {
  challenge: ChallengeInfo;
  index: number;
  activeQuiz: number;
  setActiveQuiz: Dispatch<SetStateAction<number>>;
};
const ChallengeCard = ({
  challenge,
  index,
  activeQuiz,
  setActiveQuiz,
}: ChallengeCardProps) => {
  const handleEnterChallenge = (event: any) => {
    setActiveQuiz(index);
  };
  // move this one component up
  const handleExitChallenge = () => setActiveQuiz(NO_ACTIVE_QUIZES);

  return (
    <>
      {activeQuiz !== NO_ACTIVE_QUIZES ? (
        activeQuiz === index && (
          <div
            style={{
              minWidth: '25vw',
              maxWidth: '25vw',
            }}
            key={`ChallengeCard-${index}`}
            // bg-slate-900
            className=" shadow-lg border-2 border-neon-blue  text-white h-fit w-100 p-3 mt-4 flex flex-col  rounded-md text-center "
          >
            <ChallengeQuiz
              title={challenge.title}
              activeQuiz={activeQuiz}
              handleExitChallenge={handleExitChallenge}
            />
          </div>
        )
      ) : (
        <div
          style={{
            minWidth: '25vw',
            maxWidth: '25vw',
          }}
          key={`ChallengeCard-${index}`}
          // bg-slate-900
          className=" shadow-lg border-2 border-neon-blue  text-white h-fit w-100 p-3 mt-4 flex flex-col  rounded-md text-center "
        >
          <p className="h3">{challenge.title}</p>

          <div className="flex">
            {/* <p>Description:</p> */}
            <div
              // fdsfasdf
              style={{
                borderColor: difficultyMap(challenge.difficulty),
              }}
              className="border-2  bg-custom-gray text-white p-3   rounded-lg  "
            >
              <p
                style={{
                  overflowWrap: 'anywhere',
                }}
                className=" break-words text-start"
              >
                {challenge.description}
                {challenge.description}
                {challenge.description}
                {challenge.description}
                {challenge.description}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-row justify-evenly w-full my-3 ">
              <DiReact size={40} />
              <DiPython size={40} />
              <SiTypescript size={40} />
            </div>
          </div>

          <div className="flex justify-evenly items-center border-t-2 border-neon-blue pt-3">
            <div>
              <p className="inline">Prize:</p> <p className="inline">5</p>
            </div>
            <div>
              <p className="inline">Challengers:</p>{' '}
              <p className="inline">{challenge.challengers}</p>
            </div>
            <button
              onClick={handleEnterChallenge}
              className="bg-neon-blue text-white p-3  rounded-lg hover:bg-sky-500"
            >
              Begin
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengeCard;
