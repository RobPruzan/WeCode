import WeCode, { PostContent } from '../../services/connections';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';

import { PUBLIC_SPACE } from '../../components/MainPage/Options/JoinSpace/JoinSpace';
import { PostAmountActions } from '../../redux/reducers/postAmount';
import { RootState } from '../../redux/store';

export const useGetPosts = (fn?: (state: PostContent[]) => void) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const numberOfPosts = useSelector(
    ({ postAmountState }: RootState) => postAmountState.amount
  );
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const space_id = useSelector(
    ({ spaceState }: RootState) => spaceState.currentSpaceId
  );
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['space_posts', space_id, userId, numberOfPosts],
    () => {
      return WeCode.getPosts(space_id ?? PUBLIC_SPACE, numberOfPosts);
    },
    {
      onSuccess: data => {
        fn && fn(data);
      },
      onSettled: () => {
        dispatch({ type: PostAmountActions.SetIsNotLoading });
      },
      refetchOnWindowFocus: false,
      enabled: !!space_id && !!userId && !!numberOfPosts,
    }
  );
  return {
    posts: data,
    postsError: error,
    postsIsLoading: isLoading,
    postsIsError: isError,
    refetchPosts: refetch,
  };
};
