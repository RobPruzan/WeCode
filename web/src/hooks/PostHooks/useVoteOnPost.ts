import { Dispatch, SetStateAction } from 'react';
import WeCode, { PostContent, VoteType } from '../../services/connections';

import { useMutation } from 'react-query';

export type VoteMutationParams = {
  post_id: number;
  vote_type: VoteType;
  user_id: number;
};
export const useVoteOnPost = (
  successHandler?: Dispatch<SetStateAction<PostContent[]>>
) => {
  const voteOnPostMutation = useMutation(
    ({ post_id, user_id, vote_type }: VoteMutationParams) =>
      WeCode.updateVote(post_id, user_id, vote_type),
    {
      onSuccess: data => {
        successHandler &&
          successHandler(prev =>
            prev.map(post => (post.id === data.id ? data : post))
          );
      },
    }
  );
  return voteOnPostMutation;
};
