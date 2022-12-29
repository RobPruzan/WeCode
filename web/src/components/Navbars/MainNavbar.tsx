import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';

export type MainNavbarProps = {
  height: string;
};
export const MainNavbar = ({ height }: MainNavbarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ height: height, backgroundColor: '#141414' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {'<logo>'}
          </Typography>
          <div className="Nav__right">
            <Link className="Nav__link " to="/">
              <SendIcon fontSize="large" className="ml-5" />
            </Link>
            <Link className="Nav__link" to="/spaces">
              <HomeIcon
                sx={{ fill: 'gray' }}
                fontSize="large"
                className="mx-5"
              />
            </Link>
            <DiamondSharpIcon fontSize="large" className="mr-5" />
            <Link className="Nav__link " to="/account">
              <AccountCircleIcon fontSize="large" className="mx-5" />
              {/* <DiamondSharpIcon fontSize="large" className="mx-5" /> */}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
