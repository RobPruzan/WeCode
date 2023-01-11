import { DEFAULT_PROGRAMMING_LANGUAGE } from './CodeTab';
import { DropDown } from '../../../../Options/DropDown';
import { PostContent } from '../../../../../../services/connections';
import React from 'react';
import { SelectChangeEvent } from '@mui/material';
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
    setCurrentPostInfo({ ...currentPostInfo, language: event.target.value });
  };

  return (
    <DropDown
      selection={currentPostInfo.language ?? DEFAULT_PROGRAMMING_LANGUAGE}
      options={languages}
      handleChange={handleChange}
      labelName="Language"
    />
  );
};
export default CodeLanguage;
