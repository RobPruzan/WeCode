// import DiReact from react icons package
import { DiPython, DiReact } from 'react-icons/di';
import React, { useState } from 'react';

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
};
export const DummyCodingChallenges: ChallengeInfo[] = [
  {
    title: 'Challenge 1',
    description: 'This is the first challenge',
    difficulty: 'easy',
    tags: ['javascript', 'react'],
    problem:
      "Given a string, return the first non-repeating character in it and return its index. If it doesn't exist, return -1.",
    type: 'coding',
    challengers: 2,
  },

  {
    title: 'Challenge 2',
    description: 'This is the second challenge',
    difficulty: 'medium',
    tags: ['python'],
    problem: 'what does __init__ do',
    type: 'quiz',
    challengers: 100,
  },

  {
    title: 'Challenge 3',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
    challengers: 5,
  },
  {
    title: 'Challenge 3',
    description: 'This is the third challenge',
    difficulty: 'hard',
    tags: ['javascript', 'react'],
    problem: 'What is the difference between a class and a function component?',
    type: 'quiz',
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
    <div className="flex flex-col   h-full w-full overflow-y-scroll p-4  ">
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
