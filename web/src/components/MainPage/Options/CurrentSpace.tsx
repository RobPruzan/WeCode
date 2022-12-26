import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export type CurrentSpaceProps = {
  className?: string;
};

export const CurrentSpace = ({ className }: CurrentSpaceProps) => {
  const spaceState = useSelector(({ spaceState }: RootState) => spaceState);
  const currentSpaceName = spaceState.availableSpaces?.find(
    space => space.id === spaceState.currentSpaceId
  )?.name;
  console.log('Current space name->', currentSpaceName);

  return (
    <>
      <p className={className}>{currentSpaceName ?? 'Public'}</p>
    </>
  );
};
