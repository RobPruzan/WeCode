import React from 'react';
import { PrimaryCard } from '../../PrimaryCard';
import AddSpace from './AddSpace/AddSpace';

import JoinSpace from './JoinRoom/JoinSpace';

export const Options = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      {/* div with #43bbff border rounded */}

      <PrimaryCard>
        <JoinSpace />
      </PrimaryCard>
      <PrimaryCard>
        <AddSpace />
      </PrimaryCard>
    </div>
  );
};
