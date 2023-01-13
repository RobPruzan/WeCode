import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';

import { BsPlusCircle } from 'react-icons/bs';
// import plus button from react icons
import { Button } from '@mui/material';
import { DockLocation } from '../Navbars/IconDock';
import { Link } from 'react-router-dom';
import { MainNavbar } from '../Navbars/MainNavbar';
import { RootState } from '../../redux/store';
import { SpaceActions } from '../../redux/reducers/spaces';
import SpaceAddPopup from './SpaceAddPopup';
import { SpaceCard } from './SpaceCard/SpaceCard';
import SpaceLoadingCards from './SpaceCard/SpaceLoadingCards';
import { SpaceSearch } from './SpaceSearch';
import WeCode from '../../services/connections';
import { useQuery } from 'react-query';

export const SPACE_CARD_STYLE = {
  minWidth: '35vh',
  maxWidth: '35vh',
  minHeight: '25vh',
  padding: '1%',
  margin: '1%',
};

export const SpacesView = () => {
  const user = useSelector(({ userState }: RootState) => userState.user);
  const [addSpace, setAddSpace] = useState(false);
  const [searchedSpace, setSearchedSpace] = useState('');
  const totalSpaces = useSelector(
    ({ spaceState }: RootState) => spaceState.availableSpaces
  )?.length;
  const {
    data: spaces,
    error,
    isLoading: spacesLoading,
  } = useQuery(['spaces', user?.id, totalSpaces], () =>
    WeCode.getSpaces(user?.id ?? 0)
  );

  const shownSpaces = useMemo(
    () =>
      spaces?.filter(space => {
        return (
          space.name.toLowerCase().includes(searchedSpace.toLowerCase()) ||
          space.description.toLowerCase().includes(searchedSpace.toLowerCase())
        );
      }),
    [spaces, searchedSpace]
  );

  const dispatch = useDispatch();
  return (
    <div className="spaces">
      <MainNavbar height="9vh" location={DockLocation.HOME} />
      <div className="d-flex justify-content-center mt-5">
        <SpaceSearch
          searchedSpace={searchedSpace}
          setSearchedSpace={setSearchedSpace}
        />
      </div>

      <div className="flex flex-wrap justify-center p-4">
        <>
          <SpaceCard
            style={SPACE_CARD_STYLE}
            className="flex items-center justify-center "
          >
            <BsPlusCircle
              onClick={() => setAddSpace(true)}
              size={50}
              className="hover:fill-blue-500 "
            />
          </SpaceCard>

          <SpaceAddPopup addSpace={addSpace} setAddSpace={setAddSpace} />
          {spacesLoading && (
            <>
              <SpaceLoadingCards />
            </>
          )}
          {shownSpaces &&
            shownSpaces.map(space => {
              return (
                <SpaceCard style={SPACE_CARD_STYLE}>
                  <div className="d-flex justify-content-evenly flex-column">
                    <div className="d-flex justify-content-center align-items-center ">
                      <p className="h3">{space.name}</p>
                    </div>
                    <p className="mt-3">{space.description}</p>
                    <p>Users: {space.members.length}</p>
                  </div>
                  <Link
                    style={{
                      textDecoration: 'none',
                    }}
                    to="/"
                  >
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
              );
            })}
        </>
      </div>
    </div>
  );
};
