import React, { Dispatch, SetStateAction } from 'react';

import { BsXLg } from 'react-icons/bs';
import CreateSpace from '../MainPage/Options/CreateSpace/CreateSpace';

export type SpaceAddPopupProps = {
  addSpace: boolean;
  setAddSpace: Dispatch<SetStateAction<boolean>>;
};
const SpaceAddPopup = ({ addSpace, setAddSpace }: SpaceAddPopupProps) => {
  return addSpace ? (
    <div
      className="flex flex-row justify-center items-center"
      style={{
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CreateSpace setAddSpace={setAddSpace} />
    </div>
  ) : null;
};

export default SpaceAddPopup;
