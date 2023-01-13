import React from 'react';

export type ChallengeButtonsProps = {
  handleExitChallenge: () => void;
  handleAnswer: () => void;
};
const ChallengeButtons = ({
  handleAnswer,
  handleExitChallenge,
}: ChallengeButtonsProps) => {
  return (
    <div className="flex w-full visible ">
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
  );
};

export default ChallengeButtons;
