import IconDock, { DockLocation } from '../Navbars/IconDock';

import ChallengesCol from './Challenges/ChallengesCol';
import FeedView from './FeedView/FeedView';
import { MainNavbar } from '../Navbars/MainNavbar';
import { Options } from './Options/Options';

const MainPage = () => {
  return (
    <div>
      <div className="columns ">
        <div className=" justify-center hidden lg:flex">
          <p className="h3">
            <ChallengesCol />
          </p>
        </div>
        <div>
          <div className=" sm:hidden">
            <MainNavbar location={DockLocation.HOME} />
          </div>
          <FeedView />
        </div>
        <div className="hidden sm:block">
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
