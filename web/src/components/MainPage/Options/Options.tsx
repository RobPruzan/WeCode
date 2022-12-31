import { PrimaryCard } from '../../PrimaryCard';
import CreateSpace from './CreateSpace/CreateSpace';
import { CurrentSpace } from './CurrentSpace';
const primarCardStyle = { maxWidth: '18em' };
import JoinSpace from './JoinSpace/JoinSpace';

export const Options = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3">
      <PrimaryCard style={primarCardStyle} className="p-3">
        <CurrentSpace className="h3  mb-3 d-flex justify-content-center" />
        <JoinSpace />
      </PrimaryCard>
      <PrimaryCard style={primarCardStyle} className="p-3">
        <CreateSpace />
      </PrimaryCard>
    </div>
  );
};
