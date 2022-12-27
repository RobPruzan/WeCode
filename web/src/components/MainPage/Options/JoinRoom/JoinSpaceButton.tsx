import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SpaceActions } from '../../../../redux/reducers/spaces';
export type JoinSpaceButtonProps = {
  selectedSpace: string;
  className?: string;
};
export const JoinSpaceButton = ({
  selectedSpace,
  className,
}: JoinSpaceButtonProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: SpaceActions.SetCurrentSpace,
      payload: { spaceName: selectedSpace },
    });
  };
  return (
    <Button className={className} variant="outlined" onClick={handleClick}>
      Join Space
    </Button>
  );
};