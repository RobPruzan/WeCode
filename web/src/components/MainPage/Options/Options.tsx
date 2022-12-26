import React from 'react';
import { PrimaryCard } from '../../PrimaryCard';
import { CurrentSpace } from './CurrentSpace';
import CreateSpace from './CreateSpace/CreateSpace';

import JoinSpace from './JoinSpace/JoinSpace';

export const Options = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      {/* div with #43bbff border rounded */}

      <PrimaryCard>
        <CurrentSpace className="h3  mb-3 d-flex justify-content-center" />
        <JoinSpace />
      </PrimaryCard>
      <PrimaryCard className="mw-25">
        <CreateSpace />
      </PrimaryCard>
    </div>
  );
};
