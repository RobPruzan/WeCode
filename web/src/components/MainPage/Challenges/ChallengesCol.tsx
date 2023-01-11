// import DiReact from react icons package
import { DiPython, DiReact } from 'react-icons/di';
import React, { useState } from 'react';

import { BsPlusCircle } from 'react-icons/bs';
import ChallengeCard from './ChallengeCard';
// import SiTypescript
import { SiTypescript } from 'react-icons/si';

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
export const DummyCodingChallenges: ChallengeInfo[] = [
  {
    title: 'Javascript event loop',
    description: 'This is the second challenge',
    difficulty: 'medium',
    tags: ['python'],
    problem: 'what does __init__ do',
    type: 'quiz',
    completed: false,
    challengers: 100,
  },

  {
    title: 'Scala interface class',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
    completed: true,
    challengers: 5,
  },
  {
    title: 'C pointers and references',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
    completed: true,
    challengers: 4,
  },
  {
    title: 'Javascript event loop',
    description: 'This is the second challenge',
    difficulty: 'medium',
    tags: ['python'],
    problem: 'what does __init__ do',
    type: 'quiz',
    completed: false,
    challengers: 100,
  },

  {
    title: 'Scala interface class',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
    completed: true,
    challengers: 5,
  },
  {
    title: 'C pointers and references',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
    completed: true,
    challengers: 4,
  },

  {
    title: 'Javascript event loop',
    description: 'This is the second challenge',
    difficulty: 'medium',
    tags: ['python'],
    problem: 'what does __init__ do',
    type: 'quiz',
    completed: false,
    challengers: 100,
  },

  {
    title: 'Scala interface class',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
    completed: true,
    challengers: 5,
  },
  {
    title: 'C pointers and references',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
    completed: true,
    challengers: 4,
  },
];
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

export const NO_ACTIVE_QUIZES = -1;
const ChallengesCol = () => {
  const [activeQuiz, seActiveQuiz] = useState(NO_ACTIVE_QUIZES);
  return (
    <div className="flex flex-col   h-full w-full overflow-y-auto p-4  ">
      {activeQuiz === NO_ACTIVE_QUIZES && (
        <div
          className={`
 
        border-x-2 p-3  shadow-2xl flex justify-center items-end rounded-md border-neon-blue   text-white  w-100  mt-4  border-y-2 border-y-gray-800 text-center `}
        >
          <BsPlusCircle className="hover:fill-sky-600" size={45} />
        </div>
      )}

      {DummyCodingChallenges.map((challenge, index) => (
        <ChallengeCard
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
