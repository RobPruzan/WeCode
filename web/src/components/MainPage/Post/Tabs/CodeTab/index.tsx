import React from 'react';
import Editor from '@monaco-editor/react';
export const CodeTab = () => {
  const [value, setVaue] = React.useState<string>('hello world');
  return (
    <>
      <Editor
        height="20vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </>
  );
};
