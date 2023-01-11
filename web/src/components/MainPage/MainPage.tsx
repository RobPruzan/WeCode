import IconDock, { DockLocation } from '../Navbars/IconDock';

import ChallengesCol from './Challenges/ChallengesCol';
import FeedView from './FeedView/FeedView';
import { MainNavbar } from '../Navbars/MainNavbar';
import { SpaceOptions } from './Options/Options';

const MainPage = () => {
  return (
    <div>
      <div className="columns ">
        {/* <div className="h-screen overflow-y-auto"> */}
        <div
          style={{
            minWidth: '30vw',
          }}
          className=" justify-center hidden md:flex min-w-fit  px-4 "
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
            className=" lg:hidden  sticky top-0 z-50 "
          >
            <MainNavbar location={DockLocation.HOME} />
          </div>

          <FeedView />
        </div>
        <div className="hidden lg:block">
          <div
            className=" justify-evenly align-middle  sticky top-0 z-50 shadow-lg "
            style={{
              borderBottom: '1px solid gray ',
              width: '100%',
              height: '3.9em',
            }}
          >
            <IconDock location={DockLocation.SEND} />
          </div>

          <SpaceOptions />
        </div>
      </div>
      </div>
  );
};
export default MainPage;
