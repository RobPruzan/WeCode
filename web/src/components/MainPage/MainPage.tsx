import { MainNavbar } from '../Navbars/MainNavbar';
import FeedView from './FeedView/FeedView';
import { Options } from './Options/Options';

import { DockLocation } from '../Navbars/IconDock';

const MainPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen bg-custom-gray overflow-hidden">
        <MainNavbar location={DockLocation.HOME} />
        <div className=" flex justify-center items-center flex-grow">
          <div className="h-full w-screen div bo-blue-200 grid md:grid-cols-7 grid-cols-3 border-2 border-white ">
            <div className="div text-neon-blue text-center text-5xl border-2 border-white  col-span md:col-span-2 hidden md:block overflow-y-scroll   h-5/6  ">
              <p className="h3">Filters</p>
            </div>
            <div className=" border-2 border-r-0 border-b-0 border-custom-blue  text-center py-4   border-white col-span-4 sm:col-span-2  md:col-span-3 sm:items-center overflow-y-scroll   h-5/6  ">
              <FeedView />
            </div>
            <div className="  border-2 border-white  col-span-1 md:col-span-2 hidden sm:block ">
              <Options />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
