import { DropDown, MenuData } from '../DropDown';
import { useDispatch, useSelector } from 'react-redux';

import { JoinSpaceButton } from './JoinSpaceButton';
import { PrimaryCard } from '../../../PrimaryCard';
import { RootState } from '../../../../redux/store';
import { SelectChangeEvent } from '@mui/material/Select';
import { SpaceActions } from '../../../../redux/reducers/spaces';
import WeCode from '../../../../services/connections';
import { useQuery } from 'react-query';
import { useState } from 'react';

export const PUBLIC_SPACE = 1;

const JoinSpace = () => {
  const user = useSelector(({ userState }: RootState) => userState.user);
  const spaceState = useSelector(({ spaceState }: RootState) => spaceState);
  const [selectedSpaceId, setSelectedSpaceId] = useState<number>(
    spaceState?.currentSpaceId ?? PUBLIC_SPACE
  );
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery(
    ['spaces', user?.id],
    async () => {
      const res = user && (await WeCode.getSpaces(user.id));
      dispatch({
        type: SpaceActions.SetAvailableSpaces,
        payload: { availableSpaces: res ?? [] },
      });
    }
  );
  if (isLoading) {
    <PrimaryCard
      className="p-3 "
      style={{
        minWidth: '15em',
        maxWidth: '50%',
      }}
    >
      <div>Loading...</div>
    </PrimaryCard>;
  }
  if (error) {
    return <div>Error: {`${error}`}</div>;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSpaceId(Number(event.target.value));
  };

  const menuData: MenuData[] = spaceState.availableSpaces
    ? spaceState.availableSpaces?.map(space => ({
        value: space.id,
        option: space.name,
      }))
    : [];
  return (
    <div>
      <DropDown
        selection={selectedSpaceId}
        menuData={menuData}
        handleChange={handleChange}
        defaultValue={'Public'}
        labelName="Select Space"
        style={{
          minWidth: '15em',
          maxWidth: '50%',
        }}
      />
      <JoinSpaceButton className="m-2" spaceId={selectedSpaceId} />
    </div>
  );
};
export default JoinSpace;
