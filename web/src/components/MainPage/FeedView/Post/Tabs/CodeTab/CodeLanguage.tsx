import { SelectChangeEvent } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { PostContent } from '../../../../../../services/connections';
import { DropDown } from '../../../../Options/DropDown';
import { DEFAULT_PROGRAMMING_LANGUAGE } from './CodeTab';
export type CodeLanguageProps = {
  setCurrentPostInfo: React.Dispatch<React.SetStateAction<PostContent>>;
  currentPostInfo: PostContent;
  languages: string[];
  defaultValue?: string;
};
const CodeLanguage = ({
  setCurrentPostInfo,
  currentPostInfo,
  languages,
  defaultValue,
}: CodeLanguageProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrentPostInfo({ ...currentPostInfo, langauge: event.target.value });
  };

  return (
    <DropDown
      selection={currentPostInfo.langauge ?? DEFAULT_PROGRAMMING_LANGUAGE}
      options={languages}
      handleChange={handleChange}
      labelName="Language"
    />
  );
};
export default CodeLanguage;
