import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import SendIcon from '@mui/icons-material/Send';
import WeCode, { PostContent } from '../../../../../services/connections';
import { useDispatch } from 'react-redux';
import { PostLoadingActions } from '../../../../../redux/reducers/postLoading';
export type SendPostProps = {
  postInfo?: string;
  currentPostInfo: PostContent;
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
  setCurrentPostInfo: Dispatch<SetStateAction<PostContent>>;
};
export const SendPost = ({
  postInfo,
  currentPostInfo,
  setPostedContent,
  setCurrentPostInfo,
}: SendPostProps) => {
  const dispatch = useDispatch();
  const handleSendPost = async () => {
    try {
      dispatch({ type: PostLoadingActions.SetIsLoading });

      await WeCode.sendPost({
        content: currentPostInfo.content,
        code: currentPostInfo.code,
      });
      setPostedContent(prev => [currentPostInfo, ...prev]);
      setCurrentPostInfo(prev => ({ ...prev, content: '', code: '' }));
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: PostLoadingActions.SetIsNotLoading });
  };
  return (
    <Button
      variant="outlined"
      color="primary"
      className="w-100"
      endIcon={<SendIcon />}
      onClick={handleSendPost}
    >
      Send Post
    </Button>
  );
};
