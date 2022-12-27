import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import FeedView from './FeedView/FeedView';
import { Options } from './Options/Options';

const MainPage = () => {
  return (
    <div className="App">
      <div>
        <nav className="justify-content-between d-flex p-2">
          <div style={{ color: 'white', fontSize: '1.5rem' }}>
            We Code
            <CodeIcon fontSize="large" className="m-1" />
          </div>
          <div className="m-2">
            <AccountCircleIcon fontSize="large" />
          </div>
        </nav>
        <div className="columns">
          <div>
            <Options />
          </div>

          <div>
            <FeedView />
          </div>
          <div className="d-flex justify-content-center ">
            <p className="h3">Filters</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
