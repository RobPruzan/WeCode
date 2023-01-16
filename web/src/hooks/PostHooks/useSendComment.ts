import { Dispatch, SetStateAction } from 'react';
import WeCode, {
  CommentContent,
  PostContent,
  VoteType,
} from '../../services/connections';
import { useMutation, useQueryClient } from 'react-query';

export type UseSendCommentParams = {};

export const useSendComment = ({}: UseSendCommentParams) => {
  const queryClient = useQueryClient();
  const sendCommentMutation = useMutation(
    (comment: CommentContent) => {
      return WeCode.sendComment(comment);
    },
    {
      onMutate: async comment => {
        await queryClient.cancelQueries(['comments', comment.postId]);
        const snapshot = queryClient.getQueryData<CommentContent[]>([
          'comments',
          comment.postId,
        ]);
        queryClient.setQueryData(
          ['comments', comment.postId],
          [comment, ...(snapshot ?? [])]
        );
        // Return a context with the previous and new todo
        return { snapshot, comment };
      },

      onError: (data, variables, context) => {
        queryClient.setQueryData(
          ['comments', context?.comment.postId],
          context?.snapshot
        );
      },
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries(['comments', variables.postId]);
      },
    }
  );
  return sendCommentMutation;
};
