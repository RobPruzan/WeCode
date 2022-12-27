import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { PostContent } from '../../../../../../services/connections';
import { DropDown } from '../../../../Options/DropDown';
import { SendPost } from '../../Buttons/SendPost';
import { FLAIRS } from '../PostTabs';
import { InputText } from './InputText';

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
