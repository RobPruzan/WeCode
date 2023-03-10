import { CurrentSpace } from './CurrentSpace';
import FilterOptions from '../Filters/FilterOptions';
import JoinSpace from './JoinSpace/JoinSpace';
const primarCardStyle = { maxWidth: '18em' };

const primaryCardStyle = { maxWidth: '18em' };

export const SpaceOptions = () => {
  return (
    <div className="d-flex flex-column align-items-center p-3">
      <div className="border-2 rounded-lg  border-neon-blue p-3 mb-4">
        <CurrentSpace className="h3  mb-3 d-flex justify-content-center" />
        <JoinSpace />
      </div>
      <FilterOptions />
    </div>
  );
};
