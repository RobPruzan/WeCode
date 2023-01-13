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
      className={`flex  h-full items-center justify-evenly   mt-1 bg-custom-dark-gray  ${
        location === DockLocation.HOME || location === DockLocation.ACCOUNT
          ? 'ml-auto'
          : 'justify-center w-full m-0'
      }
    }`}
    >
      <Link to="/">
        <SendIcon
          className={` ${
            location === DockLocation.HOME || location === DockLocation.ACCOUNT
              ? 'mx-8'
              : ''
          }
      }`}
          sx={{ fill: location === DockLocation.SEND ? 'gray' : undefined }}
          fontSize="large"
        />
      </Link>
      <Link to="/spaces">
        <HomeIcon
          className={` ${
            location === DockLocation.HOME || location === DockLocation.ACCOUNT
              ? 'mx-8'
              : ''
          }
      }`}
          sx={{ fill: location === DockLocation.HOME ? 'gray' : undefined }}
          fontSize="large"
        />
      </Link>

      <Link to="/account">
        <AccountCircleIcon
          className={` ${
            location === DockLocation.HOME || location === DockLocation.ACCOUNT
              ? 'mx-8'
              : ''
          }
      }`}
          sx={{
            fill: location === DockLocation.ACCOUNT ? 'gray' : '#43bbff',
          }}
          fontSize="large"
          // className="mr-4"
        />
      </Link>
    </div>
  );
};

export default IconDock;
