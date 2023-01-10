import { BsArrowDown, BsFillArrowDownCircleFill } from 'react-icons/bs';
import {
  ChallengeInfo,
  NO_ACTIVE_QUIZES,
  difficultyMap,
} from './ChallengesCol';
import { DiPython, DiReact } from 'react-icons/di';
import { Dispatch, SetStateAction, useState } from 'react';
import { TbTallymark1, TbTallymark3, TbTallymarks } from 'react-icons/tb';

import { AiOutlineFire } from 'react-icons/ai';
import ChallengeQuiz from './ChallengeQuiz';
import Collapsible from 'react-collapsible';
import { Radio } from '@mui/material';
import { SiTypescript } from 'react-icons/si';

const tallyMarkMap = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return (
        <div className="flex">
          <AiOutlineFire fill="green" size={30} />
        </div>
      );
    case 'medium':
      return (
        <div className="flex">
          <AiOutlineFire fill="orange" size={30} />
          <AiOutlineFire fill="orange" size={30} />
        </div>
      );
    case 'hard':
      return (
        <div className="flex">
          <AiOutlineFire fill="red" size={30} />
          <AiOutlineFire fill="red" size={30} />
          <AiOutlineFire fill="red" size={30} />
        </div>
      );
  }
};

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
  const [expanded, setExpanded] = useState(false);

  const handleEnterChallenge = (event: any) => {
    setExpanded(false);
    setActiveQuiz(index);
  };
  // move this one component up
  const handleExitChallenge = () => setActiveQuiz(NO_ACTIVE_QUIZES);

  return (
    <div>
      {activeQuiz !== NO_ACTIVE_QUIZES ? (
        activeQuiz === index && (
          <div
            key={`ChallengeCard-${index}`}
            // bg-slate-900
            className=" shadow-lg border-2 border-neon-blue  text-white h-fit w-100 p-3 flex flex-col  rounded-md text-center "
          >
            <ChallengeQuiz
              challenge={challenge}
              activeQuiz={activeQuiz}
              handleExitChallenge={handleExitChallenge}
            />
          </div>
        )
      ) : (
        //

        //
        <>
          <div
            className={`
    ${expanded ? 'border-b-2' : ''}
       border-x-2  shadow-2xl rounded-md border-neon-blue   text-white  h-fit w-100  mt-4  border-y-2 border-y-gray-800 text-center `}
          >
            <Collapsible
              overflowWhenOpen="visible"
              transitionTime={150}
              onOpen={() => setExpanded(true)}
              onClosing={() => setExpanded(false)}
              trigger={
                <div
                  className={`flex flex-col justify-evenly  items-center h-20 ${
                    expanded ? 'rounded-b-none' : ' hover:bg-gray-800 '
                  }rounded-md   border-neon-blue `}
                >
                  <div style={{ minHeight: '10px' }}></div>
                  <p className="text-xl">{challenge.title}</p>

                  <div className="flex justify-center w-full items-center ">
                    <p className="mr-auto">
                      {' '}
                      {tallyMarkMap(challenge.difficulty)}
                    </p>
                    <Radio
                      disableRipple={true}
                      checked={challenge.completed}
                      value="b"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'B' }}
                    />
                  </div>
                </div>
              }
            >
              <div
                key={`ChallengeCard-${index}`}
                // bg-slate-900

                className="   m-4 flex flex-col   "
              >
                <div className="flex">
                  <div
                    // fdsfasdf
                    style={{
                      backgroundColor: '#141414',
                    }}
                    className=" border-gray-600 border-2 text-white p-3 shadow-lg   rounded-lg  "
                  >
                    <p
                      style={{
                        overflowWrap: 'anywhere',
                      }}
                      className=" break-words text-start "
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
                    className=" text-white p-3 bg-neon-blue rounded-lg hover:bg-sky-500"
                  >
                    Begin
                  </button>
                </div>
              </div>
            </Collapsible>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengeCard;
