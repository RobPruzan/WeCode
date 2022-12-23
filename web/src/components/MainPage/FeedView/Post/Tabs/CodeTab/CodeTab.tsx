import React, { ChangeEvent, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from 'react-bootstrap';
import { SendPost } from '../../Buttons/SendPost';
import { TextTabProps } from '../TextTab/TextTab';
import CodeLanguage from './CodeLanguage';
import { DropDown } from '../../../../Options/DropDown';
import { SelectChangeEvent } from '@mui/material';
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

export const FLAIRS = [
  'help',
  'discussion',
  'question',
  'showcase',
  'announcement',
  'news',
];
export type CodeTabProps = TextTabProps & {
  programmingLanguage?: string;
};
export const CodeTab = ({ programmingLanguage, ...props }: CodeTabProps) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>('javascript');
  const [flair, setFlair] = useState<string>('');

  const flairChangeHandler = (event: SelectChangeEvent<string>) => {
    setFlair(event.target.value);
  };

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
      <div className="d-flex ">
        <CodeLanguage
          languages={SUPPORTED_LANGUAGES}
          setSelectedLanguage={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
        />
        <DropDown
          selection={flair}
          options={FLAIRS}
          handleChange={flairChangeHandler}
          labelName="Flair"
        />
      </div>

      <SendPost {...props} />
    </div>
  );
};
