import { Button } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import WeCode from '../../../../services/connections';
export type SendPostProps = {
  inputCode?: string;
};
export const SendPost = ({ inputCode }: SendPostProps) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      className="w-100"
      endIcon={<SendIcon />}
      onClick={() => {
        inputCode && WeCode.SendPost({ content: inputCode });
      }}
    >
      Send Post
    </Button>
  );
};
