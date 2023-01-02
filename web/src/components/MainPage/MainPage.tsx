import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import { MainNavbar } from '../Navbars/MainNavbar';
import FeedView from './FeedView/FeedView';
import { Options } from './Options/Options';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import IconDock, { DockLocation } from '../Navbars/IconDock';

const MainPage = () => {
  return (
    <div>
      <div className="columns ">
        <div className="d-flex justify-content-center hidden sm:hidden">
          <p className="h3">Filters</p>
        </div>
        <div>
          <FeedView />
        </div>
        <div>
          <div
            className="d-flex justify-content-evenly align-items-center"
            style={{
              borderBottom: '1px solid gray',
              width: '100%',
              height: '3.9em',
            }}
          >
            <IconDock location={DockLocation.SEND} />
          </div>
          <Options />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
