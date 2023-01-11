import WeCode, { Answer, UserAnswer } from '../../services/connections';
import { useMutation, useQueryClient } from 'react-query';

import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export const useAnswerChallenge = () => {
  const currUserId =
    useSelector(({ userState }: RootState) => userState.user?.id) ?? -1;
  const spaceID = useSelector(
    ({ spaceState }: RootState) => spaceState.currentSpaceId
  );
  const queryClient = useQueryClient();
  const { mutate, error, isLoading, isError, isSuccess } = useMutation(
    ({ answerId, challengeId }: UserAnswer) =>
      WeCode.answerChallenge({
        answerId,
        challengeId,
        userId: currUserId,
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['challenges', currUserId, spaceID]),
    }
  );
  return {
    answerChallenge: mutate,
    answerChallengeError: error,
    answerChallengeIsLoading: isLoading,
    answerChallengeIsError: isError,
    answerChallengeIsSuccess: isSuccess,
  };
};
