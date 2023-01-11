import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
export enum DockLocation {
  'HOME',
  'SEND',
  'ACCOUNT',
}

export type IconDockProps = {
  location: DockLocation;
};

const IconDock = ({ location }: IconDockProps) => {
  const user = useSelector(({ userState }: RootState) => userState.user);

  return (
    <div
      className={`flex w-80 h-full items-center justify-evenly
      }`}
    >
      <Link to="/">
        <SendIcon
          sx={{ fill: location === DockLocation.SEND ? 'gray' : undefined }}
          fontSize="large"
        />
      </Link>
      <Link to="/spaces">
        <HomeIcon
          sx={{ fill: location === DockLocation.HOME ? 'gray' : undefined }}
          fontSize="large"
          // className="mx-5"
        />
      </Link>

      <Link to="/account">
        <AccountCircleIcon
          sx={{
            fill: user
              ? '#34ebcc'
              : location === DockLocation.ACCOUNT
              ? 'gray'
              : '#43bbff',
          }}
          fontSize="large"
          // className="mr-4"
        />
      </Link>
    </div>
  );
};

export default IconDock;
