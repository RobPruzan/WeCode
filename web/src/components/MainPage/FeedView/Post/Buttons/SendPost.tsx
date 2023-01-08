import { Dispatch, SetStateAction, useState } from 'react';
import WeCode, { PostContent } from '../../../../../services/connections';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { PUBLIC_SPACE } from '../../../Options/JoinSpace/JoinSpace';
import { PostLoadingActions } from '../../../../../redux/reducers/postLoading';
import { RootState } from '../../../../../redux/store';
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from 'react-query';

export type MutatePostParams = {
  currPostInfo: PostContent;
  spaceId: number;
};
export type SendPostProps = {
  currentPostInfo: PostContent;
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
  setCurrentPostInfo: Dispatch<SetStateAction<PostContent>>;
  postedContent: PostContent[];
};
export const SendPost = ({
  currentPostInfo,
  setPostedContent,
  setCurrentPostInfo,
  postedContent,
}: SendPostProps) => {
  // Serves as a snapshot incase the post fails to send (since we are using optimistic updates)
  const [fallBackPosts, setfallBackPosts] =
    useState<PostContent[]>(postedContent);
  const dispatch = useDispatch();
  const space = useSelector(({ spaceState }: RootState) => spaceState);
  const user = useSelector(({ userState }: RootState) => userState.user);

  // We update the post data optimistically, assuming it will be successful, but if it fails, we revert back to the previous state
  const { data, mutate } = useMutation(
    ({ currPostInfo, spaceId }: MutatePostParams) =>
      WeCode.sendPost(currPostInfo, spaceId),

    {
      onMutate: ({ currPostInfo, spaceId }: MutatePostParams) => {
        dispatch({ type: PostLoadingActions.SetIsLoading });
      },
      onSuccess: () => {
        setPostedContent(prev => [currentPostInfo, ...prev]);
        setCurrentPostInfo(prev => ({ ...prev, content: '', code: '' }));
      },
      onError: err => {
        console.error(err);
        setPostedContent(fallBackPosts);
      },
      onSettled: () => {
        dispatch({ type: PostLoadingActions.SetIsNotLoading });
      },
    }
  );

  return (
    <Button
      variant="outlined"
      color="primary"
      className="w-100"
      endIcon={
        <SendIcon
          sx={{
            fill: !currentPostInfo.content || !user?.id ? 'gray' : undefined,
          }}
        />
      }
      disabled={!currentPostInfo.content || !user?.id}
      sx={{
        '&:disabled': {
          color: 'gray',
          bordercolor: 'gray',
        },
      }}
      onClick={_ =>
        mutate({
          currPostInfo: { ...currentPostInfo, user_id: user?.id },
          spaceId: space.currentSpaceId ?? PUBLIC_SPACE,
        })
      }
    >
      Send Post
    </Button>
  );
};
