import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import IconDock, { DockLocation } from './IconDock';

export type MainNavbarProps = {
  height?: string;
  location: DockLocation;
};
export const MainNavbar = ({ height = '9', location }: MainNavbarProps) => {
  return (
    <div className="m-2">
      <AppBar
        position="static"
        sx={{ height: `${height}vh`, backgroundColor: '#141414' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {'<logo>'}
          </Typography>
          <IconDock location={location} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
