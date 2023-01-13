import { useQuery, useQueryClient } from 'react-query';

import { Filters } from '../../components/MainPage/Filters/FilterOptions';
import { PUBLIC_SPACE } from '../../components/MainPage/Options/JoinSpace/JoinSpace';
import WeCode from '../../services/connections';

const DEFAULT_FILTERS: Filters = { languages: [], names: [], flairs: [] };

export const useGetFilterPosts = (
  space_id: number,
  filteredChoices: Filters
) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['space_posts', space_id],
    () => {
      queryClient.invalidateQueries(['space_posts', space_id]);
      return WeCode.getFilteredPosts(
        space_id ?? PUBLIC_SPACE,
        filteredChoices ?? DEFAULT_FILTERS
      );
    }
  );
  return {
    filteredPosts: data,
    filteredPostsError: error,
    filteredPostsIsLoading: isLoading,
    filteredPostsIsError: isError,
    refetchFilteredPosts: refetch,
  };
};
