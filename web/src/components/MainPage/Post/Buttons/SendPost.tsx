import { Button } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import WeCode from '../../../../services/connections';

export const SendPost = () => {
  return (
    <Button
      variant="outlined"
      color="primary"
      className="w-100"
      endIcon={<SendIcon />}
      onClick={() => WeCode.SendPost()}
    >
      Send Post
    </Button>
  );
};
