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
];

export const DEFAULT_PROGRAMMING_LANGUAGE = 'javascript';

export type CodeTabProps = TextTabProps & {
  programmingLanguage?: string;
};
export const CodeTab = ({ programmingLanguage, ...props }: CodeTabProps) => {
  const codeChangeHandler = (newValue?: string) => {
    const newCodeValue = newValue ? newValue : '';
    props.setCurrentPostInfo({ ...props.currentPostInfo, code: newCodeValue });
  };

  return (
    <div>
      <Editor
        value={props.currentPostInfo.code}
        onChange={codeChangeHandler}
        theme="vs-dark"
        height="20vh"
        language={
          props.currentPostInfo.langauge
            ? props.currentPostInfo.langauge
            : DEFAULT_PROGRAMMING_LANGUAGE
        }
        options={{ fixedOverflowWidgets: true }}
      />

      <div className="d-flex flex-wrap">
        <CodeLanguage
          languages={SUPPORTED_LANGUAGES}
          currentPostInfo={props.currentPostInfo}
          setCurrentPostInfo={props.setCurrentPostInfo}
        />
        <DropDown
          selection={props.currentPostInfo.flair}
          options={FLAIRS}
          handleChange={props.flairChangeHandler}
          labelName="Flair"
          defaultValue="Discussion"
        />
      </div>

      <SendPost {...props} />
    </div>
  );
};
