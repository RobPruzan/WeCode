import { useQuery, useQueryClient } from 'react-query';

import { Filters } from '../../components/MainPage/Filters/FilterOptions';
import { PUBLIC_SPACE } from '../../components/MainPage/Options/JoinSpace/JoinSpace';
import { RootState } from '../../redux/store';
import WeCode from '../../services/connections';
import { useSelector } from 'react-redux';

const DEFAULT_FILTERS: Filters = { languages: [], names: [], flairs: [] };

export const useGetFilterPosts = (
  space_id: number,
  filteredChoices: Filters
) => {
  const queryClient = useQueryClient();
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['space_posts', space_id, userId],
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
