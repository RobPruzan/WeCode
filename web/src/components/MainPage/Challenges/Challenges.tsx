// import DiReact from react icons package
import { DiPython, DiReact } from 'react-icons/di';

import React from 'react';
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
const DummyCodingChallenges: ChallengeInfo[] = [
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
const difficultyMap = (difficulty: string) => {
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
const Challenges = () => {
  return (
    <div className="flex flex-col   h-full w-full overflow-y-scroll p-4  ">
      {DummyCodingChallenges.map((challenge, index) => (
        <div
          style={{
            maxWidth: '25vw',
          }}
          key={index}
          // bg-slate-900
          className=" shadow-lg border-2 border-neon-blue  text-white h-fit w-100 p-3 mt-4 flex flex-col  rounded-md text-center "
        >
          <p className="h3">{challenge.title}</p>

          <div className="flex">
            {/* <p>Description:</p> */}
            <div
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
          {/* <div className="flex justify-evenly">
            <div>
              <p>Prize:</p> <p>5</p>
            </div>
            <div>
              <p>Challengers:</p> <p>{challenge.challengers}</p>
            </div>
          </div> */}

          <div className="flex">
            {/* <p>tags:</p>
            <p>{challenge.tags.join(' ')}</p> */}
            <div className="flex flex-row justify-evenly w-full my-3 ">
              <DiReact size={40} />
              <DiPython size={40} />
              <SiTypescript size={40} />
              {/* <button className="bg-neon-blue text-white p-3  rounded-lg hover:bg-sky-500">
                Enter
              </button> */}
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
            <button className="bg-neon-blue text-white p-3  rounded-lg hover:bg-sky-500">
              Enter
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Challenges;
