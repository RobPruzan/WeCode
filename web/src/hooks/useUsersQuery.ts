import WeCode from '../services/connections';
import { useQuery } from 'react-query';

export const useUsersQuery = () => {
  const { data, error, isLoading, isError } = useQuery('user_accounts', () =>
    WeCode.getUsers()
  );
  return {
    users: data,
    usersError: error,
    usersIsLoading: isLoading,
    usersIsError: isError,
  };
};
