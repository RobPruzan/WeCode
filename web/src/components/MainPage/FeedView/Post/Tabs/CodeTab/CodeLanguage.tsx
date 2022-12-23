import { SelectChangeEvent } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { DropDown } from '../../../../Options/DropDown';
export type CodeLanguageProps = {
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  selectedLanguage: string;
  languages: string[];
};
const CodeLanguage = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}: CodeLanguageProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedLanguage(event.target.value);
    console.log('gahh', selectedLanguage);
  };
  return (
    <DropDown
      selection={selectedLanguage}
      options={languages}
      handleChange={handleChange}
      labelName="Language"
    />
  );
};
export default CodeLanguage;
