import {
  CommentType,
  PostContent,
} from '../../../../../../services/connections';
import { Dispatch, SetStateAction } from 'react';

import TextField from '@mui/material/TextField';

export type InputTextProps = {
  // setCurrentPostInfo: Dispatch<SetStateAction<PostContent>> | Dispatch<SetStateAction<Comment>>
  // currentPostInfo: PostContent | Comment;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  rows: number;
  style?: React.CSSProperties;
};
export const InputText = ({
  changeHandler,
  value,
  rows,
  style,
}: InputTextProps) => {
  return (
    <TextField
      onChange={changeHandler}
      value={value}
      className="p-2 "
      id="outlined-multiline-static"
      sx={{
        color: 'white',
        '& .MuiInput-underline:before': { borderBottomColor: 'gray' },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'white',
        },

        fontFamily: 'inherit',
        ...style,
      }}
      multiline
      rows={rows}
      variant="standard"
      InputProps={{
        style: {
          color: 'white',
        },
      }}
      fullWidth
    />
  );
};
