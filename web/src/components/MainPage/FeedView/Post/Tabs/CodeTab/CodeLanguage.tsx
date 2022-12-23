import { SelectChangeEvent } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { PostContent } from '../../../../../../services/connections';
import { DropDown } from '../../../../Options/DropDown';
export type CodeLanguageProps = {
  setCurrentPostInfo: React.Dispatch<React.SetStateAction<PostContent>>;
  currentPostInfo: PostContent;
  languages: string[];
};
const CodeLanguage = ({
  setCurrentPostInfo,
  currentPostInfo,
  languages,
}: CodeLanguageProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrentPostInfo({ ...currentPostInfo, langauge: event.target.value });
  };
  useEffect(() => {
    console.log('the languge', currentPostInfo);
  }, [currentPostInfo]);
  return (
    <DropDown
      selection={currentPostInfo.langauge ?? ''}
      options={languages}
      handleChange={handleChange}
      labelName="Language"
    />
  );
};
export default CodeLanguage;
