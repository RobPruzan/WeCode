import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from 'react-bootstrap';
import { SendPost } from '../../Buttons/SendPost';

export const CodeTab = () => {
  const [inputCode, setInputCode] = useState<string>();

  useEffect(() => console.log(inputCode), [inputCode]);
  return (
    <div>
      <Editor
        value={inputCode}
        onChange={newValue => setInputCode(newValue)}
        theme="vs-dark"
        height="20vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />

      <SendPost inputCode={inputCode} />
    </div>
  );
};
