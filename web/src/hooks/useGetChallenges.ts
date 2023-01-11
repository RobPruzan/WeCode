import { RootState } from '../redux/store';
import WeCode from '../services/connections';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export const useGetChallenges = (spaceId: number) => {
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const { data, error, isLoading, isError, refetch } = useQuery(
    ['challenges', userId, spaceId],
    () => WeCode.getChallengeAndAnswers(spaceId)
  );
  return {
    challengesData: data,
    challengesError: error,
    challengesIsLoading: isLoading,
    challengesIsError: isError,
    refetchChallenges: refetch,
  };
};
