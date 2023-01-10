import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
export enum DockLocation {
  'HOME',
  'SEND',
  'DIAMOND',
  'ACCOUNT',
}

export type IconDockProps = {
  location: DockLocation;
};

const IconDock = ({ location }: IconDockProps) => {
  const user = useSelector(({ userState }: RootState) => userState.user);

  return (
    <div className="flex h-full items-center">
      <Link to="/">
        <SendIcon
          sx={{ fill: location === DockLocation.SEND ? 'gray' : undefined }}
          fontSize="large"
          style={{ marginLeft: '1.5em' }}
        />
      </Link>
      <Link to="/spaces">
        <HomeIcon
          sx={{ fill: location === DockLocation.HOME ? 'gray' : undefined }}
          fontSize="large"
          className="mx-5"
        />
      </Link>
      <DiamondSharpIcon
        sx={{ fill: location === DockLocation.DIAMOND ? 'gray' : undefined }}
        fontSize="large"
        className="mr-5"
      />
      <Link to="/account">
        <AccountCircleIcon
          sx={{
            fill: user
              ? 'green'
              : location === DockLocation.ACCOUNT
              ? 'gray'
              : '#43bbff',
          }}
          fontSize="large"
          className="mx-4"
        />
      </Link>
    </div>
  );
};

export default IconDock;
