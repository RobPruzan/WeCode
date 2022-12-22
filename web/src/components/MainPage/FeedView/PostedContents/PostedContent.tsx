import { Card } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import {
  PostContent,
  PostContent as PostInfo,
} from '../../../../services/connections';
import { CodeBlock, dracula } from 'react-code-blocks';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import differentdark themes for react syntax highlighter
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
export type PostedContentProps = {
  className?: string;
  singlePostedContent: PostInfo;
};
export const PostedContent = ({
  className,
  singlePostedContent,
}: PostedContentProps) => {
  return (
    // <div
    //   style={{ color: 'white'}}
    //   className={`border border-black border-2 rounded-xl p-2 ${className} `}
    // >
    //   {singlePostedContent.content}
    //   <hr />
    //   {singlePostedContent.code}
    // </div>
    // same thing as before but white white space pre-wrap
    <Card
      sx={{
        color: 'white',
        background: '#141414',
        border: '1px solid #43bbff',
        borderRadius: '10px',
        padding: '10px',
        whiteSpace: 'pre-wrap',
      }}
      className={className}
    >
      {singlePostedContent.content}
      <hr />
      {singlePostedContent.code && (
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {singlePostedContent.code}
        </SyntaxHighlighter>
      )}
    </Card>
  );
};
