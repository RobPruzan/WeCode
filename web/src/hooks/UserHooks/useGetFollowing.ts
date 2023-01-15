import WeCode from '../../services/connections';
import { useQuery } from 'react-query';

export const useGetFollowing = (userId: number) => {
  const followingQuery = useQuery(['following', userId], () => {
    return WeCode.getFollowing(userId);
  });

  return followingQuery;
};
