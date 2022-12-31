import { Button } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SpaceActions } from '../../redux/reducers/spaces';
import { RootState } from '../../redux/store';
import WeCode, { Space } from '../../services/connections';
import { DockLocation } from '../Navbars/IconDock';
import { MainNavbar } from '../Navbars/MainNavbar';
import { SpaceCard } from './SpaceCard/SpaceCard';
import { SpaceSearch } from './SpaceSearch';
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
