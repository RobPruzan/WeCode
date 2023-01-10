import IconDock, { DockLocation } from '../Navbars/IconDock';

import ChallengesCol from './Challenges/ChallengesCol';
import FeedView from './FeedView/FeedView';
import { MainNavbar } from '../Navbars/MainNavbar';
import { Options } from './Options/Options';

const MainPage = () => {
  return (
    <div>
      <div className="columns ">
        <div
          style={{
            minWidth: '30vw',
          }}
          className=" justify-center hidden md:flex"
        >
          <p className="h3">
            <ChallengesCol />
          </p>
        </div>
        <div>
          <div
            style={{
              backgroundColor:
                'rgb(15 23 42 / var(--tw-bg-opacity)) !important',
            }}
            className=" sm:hidden "
          >
            <MainNavbar location={DockLocation.HOME} />
          </div>
          <FeedView />
        </div>
        <div className="hidden lg:block">
          <div
            className=" justify-evenly align-middle "
            style={{
              borderBottom: '1px solid gray ',
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
