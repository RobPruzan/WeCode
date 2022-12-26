import TextField from '@mui/material/TextField';
import { Dispatch, SetStateAction } from 'react';
import { PostContent } from '../../../../../../services/connections';
export type InputTextProps = {
  setCurrentPostInfo: Dispatch<SetStateAction<PostContent>>;
  currentPostInfo: PostContent;
};
export const InputText = ({
  setCurrentPostInfo,
  currentPostInfo,
}: InputTextProps) => {
  return (
    <TextField
      onChange={event =>
        setCurrentPostInfo(prev => ({ ...prev, content: event.target.value }))
      }
      value={currentPostInfo.content}
      className="p-2 "
      id="outlined-multiline-static"
      sx={{
        color: 'white',
        '& .MuiInput-underline:before': { borderBottomColor: 'gray' },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'white',
        },

        background: '#141414',
        fontFamily: 'inherit',
      }}
      multiline
      rows={6}
      variant="standard"
      InputProps={{
        style: {
          color: 'white',
          background: '#141414',
        },
      }}
      fullWidth
    />
  );
};
