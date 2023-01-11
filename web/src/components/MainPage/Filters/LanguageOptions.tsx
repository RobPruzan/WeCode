import {
  ChangeHandler,
  DEFAULT_SPACE_INFO,
  FilterChangeHandler,
  SpaceInfo,
  TypAheadChangeHandler,
} from '../Options/CreateSpace/CreateSpace';
import React, { useMemo, useState } from 'react';
import { TypeAhead, TypeAheadOption } from '../../utils/TypeAhead';
import WeCode, { User } from '../../../services/connections';

import { PrimaryCard } from '../../PrimaryCard';
import { RootState } from '../../../redux/store';
import UserAccess from '../../Account/UserAccess';
import { UserReducer } from '../../../redux/reducers/user';
import { Users } from '../../Users/Users';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { userInfo } from 'os';

const languageNames = [
  { label: 'JavaScript', id: 1 },
  { label: 'Python', id: 2 },
  { label: 'Java', id: 3 },
  { label: 'C', id: 4 },
  { label: 'C++', id: 5 },
  { label: 'C#', id: 6 },
  { label: 'Go', id: 7 },
  { label: 'Ruby', id: 8 },
  { label: 'Rust', id: 9 },
  { label: 'Swift', id: 10 },
  { label: 'Php', id: 11 },
  { label: 'Sql', id: 12 },
  { label: 'Kotlin', id: 13 },
  { label: 'Scala', id: 14 },
];

const DEFAULT_FILTERS: Filters = { languages: [], names: [] };

export type Filters = {
  languages: TypeAheadOption[];
  names: TypeAheadOption[];
};

const LanguageOptions = () => {
  // const [chosenLanguages, setChosenLanguages] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);
  // const [chosenUsers, setChosenUsers] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);
  const user = useSelector(({ userState }: RootState) => userState.user);
  // useState<typeOfVariable>(initialValueOfVariable)
  // making state variable filters, and setter for state variable
  //
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    // dependency array
    ['following'],
    () => user && WeCode.getFollowing(user.id)
    // {onSuccess: (data) => setSelectedFollowing(data)}
  );
  const following = data ?? [];
  const followerNames = useMemo(
    () => following.map(user => ({ id: String(user.id), label: user.name })),
    [following]
  );

  const handleFilterChange: FilterChangeHandler = (
    event,
    newValue,
    filterChoice
  ) => {
    // const users = newValue.map(user => user.id);
    setFilters((prev): Filters => ({ ...prev, [filterChoice]: newValue }));
  };
  return (
    // <div className="hidden sm:flex flex-col ">
    //   <div
    //     style={{
    //       minWidth: '15em',
    //       maxWidth: '50%',
    //     }}
    //     className="text-center justify-center  border-2 p-3 rounded-md border-blue-400"
    //   >
    <div className="border-2 border-neon-blue rounded-lg p-4">
      <p className="h3 text-center">Filters</p>
      <TypeAhead
        options={languageNames}
        label="Select Languages"
        changeHandler={(event, newValue) =>
          handleFilterChange(event, newValue, 'languages')
        }
        members={filters.languages}
        placeholder="Languages"
      />
      <div className="mt-4" />
      <TypeAhead
        options={followerNames}
        label="Select Users"
        changeHandler={(event, newValue) =>
          handleFilterChange(event, newValue, 'names')
        }
        members={filters.names}
        placeholder="Users"
      />
    </div>
  );
};

export default LanguageOptions;
