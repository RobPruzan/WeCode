import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from 'react-bootstrap';
import { SendPost } from '../../Buttons/SendPost';

export const CodeTab = () => {
  const [value, setVaue] = useState<string>('hello world');
  return (
    <div>
      <Editor
        height="20vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
      {/* Dark gray line that is not touching the ends of the div, using something like margin */}
      <div
        className="w-auto bg-secondary mx-2 mb-2"
        style={{ height: '1px' }}
      />

      <SendPost />
    </div>
  );
};
