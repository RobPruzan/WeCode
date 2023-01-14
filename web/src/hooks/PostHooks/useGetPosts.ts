import WeCode, { PostContent } from '../../services/connections';
import { useQuery, useQueryClient } from 'react-query';

import { PUBLIC_SPACE } from '../../components/MainPage/Options/JoinSpace/JoinSpace';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const useGetPosts = (fn?: (state: PostContent[]) => void) => {
  const queryClient = useQueryClient();
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const space_id = useSelector(
    ({ spaceState }: RootState) => spaceState.currentSpaceId
  );
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['space_posts', space_id, userId],
    () => WeCode.getPosts(space_id ?? PUBLIC_SPACE),
    {
      onSuccess: data => {
        fn && fn(data);
      },
      refetchOnWindowFocus: false,
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
