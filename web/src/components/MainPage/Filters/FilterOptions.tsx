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
import { placeholder } from '@babel/types';
import { Button } from '@mui/material';
import { PUBLIC_SPACE } from '../Options/JoinSpace/JoinSpace';

const LANGUAGE_FILTER_NAMES = [
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

const FLAIR_FILTER_NAMES = [
  { label: 'Help', id: 1 },
  { label: 'Discussion', id: 2 },
  { label: 'Question', id: 3 },
  { label: 'Showcase', id: 4 },
  { label: 'Announcement', id: 5 },
  { label: 'News', id: 6 },
];

const DEFAULT_FILTERS: Filters = { languages: [], names: [], flairs: [] };
export type Filters = {
  languages: TypeAheadOption[];
  names: TypeAheadOption[];
  flairs: TypeAheadOption[];
};

const FilterOptions = () => {
  // const [chosenLanguages, setChosenLanguages] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);
  // const [chosenUsers, setChosenUsers] = useState<SpaceInfo>(DEFAULT_SPACE_INFO);
  const user = useSelector(({ userState }: RootState) => userState.user);
  const spaceId =
    useSelector(({ spaceState }: RootState) => spaceState.currentSpaceId) ??
    PUBLIC_SPACE;
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
    setFilters((prev): Filters => ({ ...prev, [filterChoice]: newValue }));
  };
  return (
    <div
      style={{ minHeight: '24rem' }}
      className="border-2 border-neon-blue rounded-lg p-4 flex flex-col justify-evenly"
    >
      <p className="h3 text-center">Filters</p>
      <TypeAhead
        options={LANGUAGE_FILTER_NAMES}
        label="Select Languages"
        changeHandler={(event, newValue) =>
          handleFilterChange(event, newValue, 'languages')
        }
        members={filters.languages}
        placeholder={filters.languages.length > 0 ? '' : 'Languages'}
      />
      <div className="mt-4" />
      <TypeAhead
        options={followerNames}
        label="Select Users"
        changeHandler={(event, newValue) =>
          handleFilterChange(event, newValue, 'names')
        }
        members={filters.names}
        placeholder={filters.names.length > 0 ? '' : 'Users'}
      />
      <div className="mt-4" />
      <TypeAhead
        options={FLAIR_FILTER_NAMES}
        label="Select Flair"
        changeHandler={(event, newValue) =>
          handleFilterChange(event, newValue, 'flairs')
        }
        members={filters.flairs}
        placeholder={filters.flairs.length > 0 ? '' : 'Flairs'}
      />
      <Button
        className="mt-4 w-1/2"
        variant="outlined"
        onClick={() => WeCode.getFilteredPosts(spaceId, filters)}
      >
        Apply
      </Button>
    </div>
  );
};

export default FilterOptions;
