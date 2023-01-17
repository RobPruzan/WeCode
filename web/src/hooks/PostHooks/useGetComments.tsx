import WeCode, { PostContent } from '../../services/connections';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';

import { PUBLIC_SPACE } from '../../components/MainPage/Options/JoinSpace/JoinSpace';
import { PostAmountActions } from '../../redux/reducers/postAmount';
import { RootState } from '../../redux/store';

export const useGetComments = (postId: number) => {
  const queryClient = useQueryClient();

  const getCommentsQuery = useQuery(
    ['comments', postId],
    () => {
      return WeCode.getComments(postId);
    },
    {
      enabled: !!postId,
    }
  );
  return getCommentsQuery;
};
