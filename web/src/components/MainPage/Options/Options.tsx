import React from 'react';
import { PrimaryCard } from '../../PrimaryCard';
import CreateSpace from './CreateSpace/CreateSpace';

import JoinSpace from './JoinRoom/JoinSpace';

export const Options = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      {/* div with #43bbff border rounded */}

      <PrimaryCard>
        <JoinSpace />
      </PrimaryCard>
      <PrimaryCard>
        <CreateSpace />
      </PrimaryCard>
    </div>
  );
};
