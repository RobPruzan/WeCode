import CreateSpace from './CreateSpace/CreateSpace';
import { CurrentSpace } from './CurrentSpace';
import JoinSpace from './JoinSpace/JoinSpace';
import { PrimaryCard } from '../../PrimaryCard';
const primarCardStyle = { maxWidth: '18em' };

export const Options = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      <div className="border-2 rounded-lg  border-neon-blue p-3 mb-4">
        <CurrentSpace className="h3  mb-3 d-flex justify-content-center" />
        <JoinSpace />
      </div>

      <CreateSpace />
    </div>
  );
};
