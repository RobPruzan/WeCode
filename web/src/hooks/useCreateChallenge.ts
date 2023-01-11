import { useMutation, useQueryClient } from 'react-query';

import { ChallengeCreate } from '../components/MainPage/Challenges/CreateChallenge/CreateChallenge';
import { RootState } from '../redux/store';
import WeCode from '../services/connections';
import { useSelector } from 'react-redux';

export const useCreateChallenge = (successHandler?: VoidFunction) => {
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const spaceId = useSelector(
    ({ spaceState }: RootState) => spaceState.currentSpaceId
  );
  const queryClient = useQueryClient();
  const { mutate, error, isLoading, isError, isSuccess } = useMutation(
    (challenge: ChallengeCreate) =>
      WeCode.createChallenge(challenge, spaceId ?? 0, userId ?? 0),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['challenges', userId]);
        successHandler && successHandler(); // if the mutation is successful, refetch the related query
      },
    }
  );
  return {
    createChallenge: mutate,
    createChallengeError: error,
    createChallengeIsLoading: isLoading,
    createChallengeIsError: isError,
    createChallengeIsSuccess: isSuccess,
  };
};
