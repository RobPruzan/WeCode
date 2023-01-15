import WeCode from '../../services/connections';
import { useQuery } from 'react-query';

export const useGetFollowers = (userId: number) => {
  const followersQuery = useQuery(['followers', userId], () => {
    return WeCode.getFollowers(userId);
  });
  return followersQuery;
};
