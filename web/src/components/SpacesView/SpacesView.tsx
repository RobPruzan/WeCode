import WeCode, { Space } from '../../services/connections';
import { useDispatch, useSelector } from 'react-redux';

// import plus button from react icons
import { BsPlusCircle } from 'react-icons/bs';
import { Button } from '@mui/material';
import { DockLocation } from '../Navbars/IconDock';
import { Link } from 'react-router-dom';
import { MainNavbar } from '../Navbars/MainNavbar';
import React from 'react';
import { RootState } from '../../redux/store';
import { SpaceActions } from '../../redux/reducers/spaces';
import { SpaceCard } from './SpaceCard/SpaceCard';
import { SpaceSearch } from './SpaceSearch';
import { useQuery } from 'react-query';

const SPACE_CARD_STYLE = {
  minWidth: '35vh',
  minHeight: '25vh',

  // minWidth: '50vh',
  // minHeight: '35vh',
  // wrap

  padding: '1%',
  margin: '1%',
};

export const SpacesView = () => {
  const user = useSelector(({ userState }: RootState) => userState.user);
  const { data, error, isLoading } = useQuery('spaces', async () => {
    return user && WeCode.getSpaces(user.id);
  });

  const dispatch = useDispatch();
  return (
    <div className="spaces">
      <MainNavbar height="9vh" location={DockLocation.HOME} />
      <div className="d-flex justify-content-center mt-5">
        <SpaceSearch />
      </div>

      <div className="spaces-container">
        <>
          <SpaceCard
            style={SPACE_CARD_STYLE}
            className="flex items-center justify-center "
          >
            <BsPlusCircle size={50} className="hover:fill-blue-500 " />
          </SpaceCard>
          {isLoading && (
            <div className="d-flex justify-content-center">Loading...</div>
          )}
          {error && <div>Error: {`${error}`}</div>}
          {data &&
            data.map((space: Space) => (
              <SpaceCard style={SPACE_CARD_STYLE}>
                <div className="d-flex justify-content-evenly flex-column">
                  <div className="d-flex justify-content-center align-items-center ">
                    <p className="h3">{space.name}</p>
                  </div>
                  <p className="mt-3">{space.description}</p>
                  <p>Users: {space.members.length}</p>
                </div>
                {/* <div className="d-flex justify-content-center flex-column"> */}
                <Link to="/">
                  <Button
                    onClick={() =>
                      dispatch({
                        type: SpaceActions.SetCurrentSpace,
                        payload: { currentSpaceId: space.id },
                      })
                    }
                    variant="outlined"
                  >
                    Join Space
                  </Button>
                </Link>
              </SpaceCard>
            ))}
        </>
      </div>
    </div>
  );
};
