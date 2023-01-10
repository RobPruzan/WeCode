import { TypeAhead, TypeAheadOption } from '../../../utils/TypeAhead';

import { TypAheadChangeHandler } from './CreateSpace';
import WeCode from '../../../../services/connections';
import { useQuery } from 'react-query';

export type SpaceUsersProps = {
  className?: string;
  changeHandler: TypAheadChangeHandler;
  members: TypeAheadOption[];
};
export const SpaceUsers = ({
  className,
  changeHandler,
  members,
}: SpaceUsersProps) => {
  const { data, error, isLoading } = useQuery('user_names', () =>
    WeCode.getUsernames()
  );

  if (error) {
    return <div>Error: {`${error}`}</div>;
  }

  return (
    <div className={className}>
      {data && (
        <TypeAhead
          members={members}
          label="Select Users"
          options={data}
          changeHandler={changeHandler}
          placeholder="Users"
        />
      )}
    </div>
  );
};
