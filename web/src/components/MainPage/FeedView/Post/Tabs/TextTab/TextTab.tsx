import { SelectChangeEvent } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { PostContent } from '../../../../../../services/connections';
import { DropDown } from '../../../../Options/DropDown';
import { SendPost } from '../../Buttons/SendPost';
import { FLAIRS } from '../PostTabs';
import { InputText } from './InputText';
export type TextTabProps = {
  setCurrentPostInfo: Dispatch<SetStateAction<PostContent>>;
  currentPostInfo: PostContent;
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
  flairChangeHandler: (event: SelectChangeEvent<string>) => void;
};

export const TextTab = ({
  currentPostInfo,
  setPostedContent,
  setCurrentPostInfo,
  flairChangeHandler,
}: TextTabProps) => {
  return (
    <>
      <InputText
        setCurrentPostInfo={setCurrentPostInfo}
        currentPostInfo={currentPostInfo}
      />
      <DropDown
        selection={currentPostInfo.flair ?? ''}
        options={FLAIRS}
        handleChange={flairChangeHandler}
        labelName="Flair"
      />
      <SendPost
        setCurrentPostInfo={setCurrentPostInfo}
        currentPostInfo={currentPostInfo}
        setPostedContent={setPostedContent}
      />
    </>
  );
};
