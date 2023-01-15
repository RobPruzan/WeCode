import { RootState } from '../../redux/store';
import WeCode from '../../services/connections';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export const useUsersQuery = () => {
  const userId = useSelector(({ userState }: RootState) => userState.user?.id);
  const getUsersQuery = useQuery(['user_accounts', userId], () =>
    WeCode.getUsers()
  );
  return getUsersQuery;
};
