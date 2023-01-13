import WeCode, { PostContent } from '../../services/connections';
import { useQuery, useQueryClient } from 'react-query';

import { PUBLIC_SPACE } from '../../components/MainPage/Options/JoinSpace/JoinSpace';

export const useGetPosts = (
  space_id: number,
  fn?: (state: PostContent[]) => void
) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['space_posts', space_id],
    () => WeCode.getPosts(space_id ?? PUBLIC_SPACE),
    {
      onSuccess: data => {
        fn && fn(data?.reverse());
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
