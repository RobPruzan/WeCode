import WeCode, { PostContent } from '../../services/connections';
import { useQuery, useQueryClient } from 'react-query';
import { PUBLIC_SPACE } from '../../components/MainPage/Options/JoinSpace/JoinSpace';
import { Filters } from '../../components/MainPage/Filters/FilterOptions';

const DEFAULT_FILTERS: Filters = { languages: [], names: [], flairs: [] };

export const useGetFilterPosts = (
  space_id: number,
  filteredChoices: Filters,
  fn?: (state: PostContent[]) => void
) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['space_posts', space_id],
    () =>
      WeCode.getFilteredPosts(
        space_id ?? PUBLIC_SPACE,
        filteredChoices ?? DEFAULT_FILTERS
      ),
    {
      onSuccess: data => {
        fn && fn(data?.reverse());
      },
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
