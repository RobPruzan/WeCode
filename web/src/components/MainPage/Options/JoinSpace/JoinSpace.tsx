import { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { SpaceActions } from '../../../../redux/reducers/spaces';
import { RootState } from '../../../../redux/store';
import WeCode from '../../../../services/connections';
import { PrimaryCard } from '../../../PrimaryCard';
import { DropDown, MenuData } from '../DropDown';
import { JoinSpaceButton } from './JoinSpaceButton';

export const PUBLIC_SPACE = 1;

const JoinSpace = () => {
  const [selectedSpaceId, setSelectedSpaceId] = useState<number>(PUBLIC_SPACE);
  const dispatch = useDispatch();
  const availableSpaces = useSelector(
    ({ spaceState }: RootState) => spaceState.availableSpaces
  );
  // const [spaces, setSpaces] = useState<Space[]>([]);
  const { data, error, isLoading } = useQuery(
    ['spaces', availableSpaces],
    async () => {
      const res = await WeCode.getSpaces();
      dispatch({
        type: SpaceActions.SetAvailableSpaces,
        payload: { availableSpaces: res },
      });
    }
  );
  if (isLoading) {
    <PrimaryCard
      className="p-3"
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
    console.log('dropdown event', event);

    setSelectedSpaceId(Number(event.target.value));
  };

  const menuData: MenuData[] = availableSpaces
    ? availableSpaces.map(space => ({
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
