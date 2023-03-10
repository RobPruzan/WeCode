import IconDock, { DockLocation } from './IconDock';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { BsCode } from 'react-icons/bs';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import SendIcon from '@mui/icons-material/Send';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export type MainNavbarProps = {
  height?: string;
  location: DockLocation;
};
export const MainNavbar = ({ height = '9', location }: MainNavbarProps) => {
  return (
    <div className="mb-2">
      <AppBar
        position="static"
        sx={{ height: `${height}vh`, backgroundColor: '#141414' }}
      >
        <Toolbar>
          <Link
            to={'/'}
            className="flex items-center"
            style={{
              textDecoration: 'none',
            }}
          >
            <p className="h3 mb-0 mr-1">WeCode</p>
            <BsCode className="cursor-pointer" size={50} />
          </Link>

          <IconDock location={location} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
