import { useQuery } from 'react-query';
import WeCode from '../services/connections';

export const useUsersQuery = () => {
  const { data, error, isLoading, isError } = useQuery(
    'user_accounts',
    async () => {
      return WeCode.getUsers();
    }
  );
  return {
    users: data,
    usersError: error,
    usersIsLoading: isLoading,
    usersIsError: isError,
  };
};
