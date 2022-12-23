import React, { ChangeEvent, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from 'react-bootstrap';
import { SendPost } from '../../Buttons/SendPost';
import { TextTabProps } from '../TextTab/TextTab';
export type CodeTabProps = TextTabProps & {
  programmingLanguage?: string;
};
export const CodeTab = ({ programmingLanguage, ...props }: CodeTabProps) => {
  const [inputCode, setInputCode] = useState<string>();
  const codeChangeHandler = (newValue?: string) => {
    const newCodeValue = newValue ? newValue : '';
    props.setCurrentPostInfo({ ...props.currentPostInfo, code: newCodeValue });
  };

  useEffect(() => console.log(inputCode), [inputCode]);
  return (
    <div>
      {/* <Editor
        value={props.currentPostInfo.code}
        onChange={codeChangeHandler}
        theme="vs-dark"
        height="20vh"
        defaultLanguage="javascript"
       
      /> */}
      {/* same thing as before but the editor is read only */}
      <Editor
        value={props.currentPostInfo.code}
        onChange={codeChangeHandler}
        theme="vs-dark"
        height="20vh"
        defaultLanguage="javascript"
        options={{ fixedOverflowWidgets: true }}
      />

      <SendPost {...props} />
    </div>
  );
};
