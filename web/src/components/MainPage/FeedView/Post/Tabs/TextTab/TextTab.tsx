import { Dispatch, SetStateAction } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

import { DropDown } from '../../../../Options/DropDown';
import { FLAIRS } from '../PostTabs';
import { InputText } from './InputText';
import { PostContent } from '../../../../../../services/connections';
import { SelectChangeEvent } from '@mui/material';
import { SendPost } from '../../Buttons/SendPost';

const defaultFlair = 'Discussion';

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
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPostInfo(prev => ({ ...prev, content: event.target.value }));
  };
  return (
    <>
      <InputText
        changeHandler={changeHandler}
        value={currentPostInfo.content}
        rows={6}
      />
      <DropDown
        selection={currentPostInfo.flair}
        options={FLAIRS}
        handleChange={flairChangeHandler}
        labelName="Flair"
        defaultValue="Discussion"
      />
      <SendPost
        setCurrentPostInfo={setCurrentPostInfo}
        currentPostInfo={currentPostInfo}
        setPostedContent={setPostedContent}
      />
    </>
  );
};
