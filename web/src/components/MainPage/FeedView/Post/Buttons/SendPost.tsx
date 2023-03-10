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
  setPostButtonToggled?: Dispatch<SetStateAction<boolean>>;
};
export const SendPost = ({
  currentPostInfo,
  setPostedContent,
  setCurrentPostInfo,
  postedContent,
  setPostButtonToggled,
}: SendPostProps) => {
  // Serves as a snapshot incase the post fails to send (since we are using optimistic updates)
  const [fallBackPosts, setFallBackPosts] =
    useState<PostContent[]>(postedContent);
  const dispatch = useDispatch();
  const space = useSelector(({ spaceState }: RootState) => spaceState);
  const user = useSelector(({ userState }: RootState) => userState.user);

  // We update the post data optimistically, assuming it will be successful, but if it fails, we revert back to the previous state
  const sendPostMutation = useMutation(
    ({ currPostInfo, spaceId }: MutatePostParams) =>
      WeCode.sendPost(currPostInfo, spaceId),

    {
      onMutate: ({ currPostInfo, spaceId }: MutatePostParams) => {
        setCurrentPostInfo(prev => ({
          ...prev,
          content: '',
          code: '',
          likes: 0,
          liked_by: [],
        }));
        dispatch({ type: PostLoadingActions.SetIsLoading });
      },
      onSuccess: (_, params) => {
        setPostedContent(prev => [params.currPostInfo, ...prev]);

        const date = new Date().toLocaleString();
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
      onClick={_ => {
        setPostButtonToggled && setPostButtonToggled(false);

        sendPostMutation.mutate({
          currPostInfo: {
            ...currentPostInfo,
            user_id: user?.id,
            user: user,
            likes: 0,
            language:
              currentPostInfo.code?.length === 0 && !currentPostInfo.language
                ? 'javascript'
                : currentPostInfo.language,
            liked_by: [],
          },
          spaceId: space.currentSpaceId ?? PUBLIC_SPACE,
        });
      }}
    >
      Send Post
    </Button>
  );
};
