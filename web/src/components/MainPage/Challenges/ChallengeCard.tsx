import { DiPython, DiReact } from 'react-icons/di';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { AiOutlineFire } from 'react-icons/ai';
import { Challenge } from '../../../services/connections';
import ChallengeQuiz from './ChallengeQuiz';
import Collapsible from 'react-collapsible';
import { NO_ACTIVE_QUIZZES } from './ChallengesCol';
import { Radio } from '@mui/material';
import { RootState } from '../../../redux/store';
import { SiTypescript } from 'react-icons/si';
import { useSelector } from 'react-redux';

const tallyMarkMap = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return (
        <div className="flex">
          <AiOutlineFire fill="#34ebba" size={30} />
        </div>
      );
    case 2:
      return (
        <div className="flex">
          <AiOutlineFire fill="green" size={30} />
          <AiOutlineFire fill="green" size={30} />
        </div>
      );

    case 3:
      return (
        <div className="flex">
          <AiOutlineFire fill="yellow" size={30} />
          <AiOutlineFire fill="yellow" size={30} />
          <AiOutlineFire fill="yellow" size={30} />
        </div>
      );
    case 4:
      return (
        <div className="flex">
          <AiOutlineFire fill="orange" size={30} />
          <AiOutlineFire fill="orange" size={30} />
          <AiOutlineFire fill="orange" size={30} />
          <AiOutlineFire fill="orange" size={30} />
        </div>
      );

    case 5:
      return (
        <div className="flex">
          <AiOutlineFire fill="red" size={30} />
          <AiOutlineFire fill="red" size={30} />
          <AiOutlineFire fill="red" size={30} />
          <AiOutlineFire fill="red" size={30} />
          <AiOutlineFire fill="red" size={30} />
        </div>
      );
  }
};

export type ChallengeCardProps = {
  challenge: Challenge;
  index: number;
  activeQuiz: number;
  setActiveQuiz: Dispatch<SetStateAction<number>>;
  handleExitChallenge: VoidFunction;
};
const ChallengeCard = ({
  challenge,
  index,
  activeQuiz,
  setActiveQuiz,
  handleExitChallenge,
}: ChallengeCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const user = useSelector(({ userState }: RootState) => userState.user);

  const userCompletedChallenge = useMemo(
    () =>
      challenge.users_that_attempted.some(
        user_succeeded => user_succeeded.id === user?.id
      ),
    [challenge.users_that_succeeded, user?.id]
  );
  const handleEnterChallenge = (event: any) => {
    setExpanded(false);
    setActiveQuiz(index);
  };

  return (
    <>
      {activeQuiz !== NO_ACTIVE_QUIZZES ? (
        activeQuiz === index && (
          <div
            style={{
              minWidth: '300px',
              flexShrink: 0,
            }}
            key={`ChallengeCard-${index}`}
            className=" shadow-lg border-2 border-neon-blue  text-white h-fit p-3 flex flex-col   rounded-md text-center "
          >
            <ChallengeQuiz
              challenge={challenge}
              activeQuiz={activeQuiz}
              handleExitChallenge={handleExitChallenge}
            />
          </div>
        )
      ) : (
        <>
          <div
            className={`
     ${expanded ? 'border-b-2' : ''}
       border-x-2  shadow-2xl rounded-md border-neon-blue min-w-fit  text-white  h-fit  mt-4  border-y-2 border-y-gray-800 text-center `}
          >
            <Collapsible
              overflowWhenOpen="visible"
              transitionTime={150}
              onOpening={() => setExpanded(true)}
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
                      {tallyMarkMap(challenge.difficulty)}
                    </p>
                    <Radio
                      disableRipple={true}
                      checked={userCompletedChallenge}
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
                    style={{
                      backgroundColor: '#141414',
                    }}
                    className=" border-gray-600 border-2 text-white p-3 shadow-lg   rounded-lg w-100 "
                  >
                    <p
                      style={{
                        overflowWrap: 'anywhere',
                      }}
                      className=" break-words text-start "
                    >
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-evenly items-center border-t-2 my-3 border-neon-blue pt-3">
                  <div>
                    <p className="inline">Challengers:</p>{' '}
                    <p className="inline">
                      {challenge.users_that_attempted.length}
                    </p>
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
    </>
  );
};

export default ChallengeCard;
