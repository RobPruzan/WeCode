import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import { MainNavbar } from '../Navbars/MainNavbar';
import FeedView from './FeedView/FeedView';
import { Options } from './Options/Options';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';

const MainPage = () => {
  return (
    <div className="App">
      <div>
        {/* <nav className="justify-content-between d-flex p-2">
          <div style={{ color: 'white', fontSize: '1.5rem' }}>
            We Code
            <CodeIcon fontSize="large" className="m-1" />
          </div>
          <div className="m-2">
            <AccountCircleIcon fontSize="large" />
          </div>
        </nav> */}

        <div className="columns">
          <div className="d-flex justify-content-center ">
            <p className="h3">Filters</p>
          </div>
          <div>
            <FeedView />
          </div>
          {/* <div className="d-flex justify-content-center ">
            <p className="h3">Filters</p>
          </div> */}
          <div>
            <div
              className="d-flex justify-content-evenly align-items-center"
              style={{
                borderBottom: '1px solid gray',
                width: '100%',
                height: '3.9em',
              }}
            >
              <SendIcon
                fontSize="large"
                sx={{
                  fill: 'gray',
                }}
              />
              <Link to="/spaces">
                <HomeIcon fontSize="large" />
              </Link>

              <DiamondSharpIcon fontSize="large" />
              <AccountCircleIcon fontSize="large" />
            </div>
            <Options />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
