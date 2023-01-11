import { BsPlusCircle } from 'react-icons/bs';
import ChallengeCard from './ChallengeCard';
import { RootState } from '../../../redux/store';
import { useGetChallenges } from '../../../hooks/useGetChallenges';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export type ChallengeInfo = {
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  problem: string;
  type: string;
  challengers?: number;
  completed: boolean;
};

export const difficultyMap = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'green';
    case 'medium':
      return 'yellow';
    case 'hard':
      return 'red';
    default:
      return 'Easy';
  }
};

export const NO_ACTIVE_QUIZZES = -1;
const ChallengesCol = () => {
  const [activeQuiz, seActiveQuiz] = useState(NO_ACTIVE_QUIZZES);
  const currentSpaceId = useSelector(
    ({ spaceState }: RootState) => spaceState.currentSpaceId
  );
  const {
    challengesData,
    challengesError,
    challengesIsError,
    challengesIsLoading,
    refetchChallenges,
  } = useGetChallenges(currentSpaceId ?? 0);
  // defined in the card to avoid re-initializing the function on every render in the quiz component
  const handleExitChallenge = () => {
    seActiveQuiz(NO_ACTIVE_QUIZZES);
  };

  return (
    <div className="flex flex-col   h-full w-full overflow-y-auto p-4  ">
      {activeQuiz === NO_ACTIVE_QUIZZES && (
        <div
          className={`
 
        border-x-2 p-3  shadow-2xl flex justify-center items-end rounded-md border-neon-blue   text-white  w-100  mt-4  border-y-2 border-y-gray-800 text-center `}
        >
          <BsPlusCircle className="hover:fill-sky-600" size={45} />
        </div>
      )}

      {challengesData &&
        challengesData.map((challenge, index) => (
          <ChallengeCard
            handleExitChallenge={handleExitChallenge}
            activeQuiz={activeQuiz}
            setActiveQuiz={seActiveQuiz}
            challenge={challenge}
            index={index}
          />
        ))}
    </div>
  );
};

export default ChallengesCol;
