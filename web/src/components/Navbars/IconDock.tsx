import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
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
    <div
      className="Nav__right"
      style={{
        display: 'inline-block',
      }}
    >
      <Link className="Nav__link " to="/">
        <SendIcon
          sx={{ fill: location === DockLocation.SEND ? 'gray' : undefined }}
          fontSize="large"
        />
      </Link>
      <Link className="Nav__link" to="/spaces">
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
      <Link className="Nav__link " to="/account">
        <AccountCircleIcon
          sx={{
            fill: user
              ? 'green'
              : location === DockLocation.ACCOUNT
              ? 'gray'
              : undefined,
          }}
          fontSize="large"
          className="mx-5"
        />
        {/* <DiamondSharpIcon fontSize="large" className="mx-5" /> */}
      </Link>
    </div>
  );
};

export default IconDock;
