import React, { ChangeEvent, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from 'react-bootstrap';
import { SendPost } from '../../Buttons/SendPost';
import { TextTabProps } from '../TextTab/TextTab';
import CodeLanguage from './CodeLanguage';
import { DropDown } from '../../../../Options/DropDown';
import { SelectChangeEvent } from '@mui/material';
import { FLAIRS } from '../PostTabs';
export const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'c',
  'cpp',
  'csharp',
  'go',
  'ruby',
  'rust',
  'swift',
  'php',
  'sql',
  'kotlin',
  'scala',
  'bash',
  'powershell',
];

export type CodeTabProps = TextTabProps & {
  programmingLanguage?: string;
};
export const CodeTab = ({ programmingLanguage, ...props }: CodeTabProps) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>('javascript');

  const codeChangeHandler = (newValue?: string) => {
    const newCodeValue = newValue ? newValue : '';
    props.setCurrentPostInfo({ ...props.currentPostInfo, code: newCodeValue });
  };
  useEffect(() => {
    console.log('programmingLanguage', programmingLanguage);
  }, [programmingLanguage]);

  return (
    <div>
      <Editor
        value={props.currentPostInfo.code}
        onChange={codeChangeHandler}
        theme="vs-dark"
        height="20vh"
        language={selectedLanguage}
        options={{ fixedOverflowWidgets: true }}
      />
      {/* flex wrap and shrink*/}
      <div className="d-flex flex-wrap">
        <CodeLanguage
          languages={SUPPORTED_LANGUAGES}
          // setSelectedLanguage={setSelectedLanguage}
          // selectedLanguage={selectedLanguage}
          currentPostInfo={props.currentPostInfo}
          setCurrentPostInfo={props.setCurrentPostInfo}
        />
        <DropDown
          selection={props.currentPostInfo.flair ?? ''}
          options={FLAIRS}
          handleChange={props.flairChangeHandler}
          labelName="Flair"
        />
      </div>

      <SendPost {...props} />
    </div>
  );
};
