import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PostAmountActions } from '../../../../../redux/reducers/postAmount';
import { RootState } from '../../../../../redux/store';
import { Spinner } from 'react-bootstrap';

export type LoadMoreProps = {};
const LoadMore = ({}: LoadMoreProps) => {
  const dispatch = useDispatch();
  const postAmountState = useSelector(
    ({ postAmountState }: RootState) => postAmountState
  );

  return postAmountState.addingPostIsLoading ? (
    <div className="flex justify-center items-center mb-4">
      <button className="bg-sky-500 w-1/4 text-white font-bold py-2 px-4 rounded">
        <Spinner size="sm" />
      </button>
    </div>
  ) : (
    <div className="flex justify-center items-center mb-4">
      <button
        onClick={() => {
          // dispatch({
          //   type: PostAmountActions.SetIsLoading,
          //   payload: { addingPostIsLoading: true },
          // });
          dispatch({
            type: PostAmountActions.SetAmount,
            payload: { amount: postAmountState.amount + 25 },
          });
        }}
        className="bg-neon-blue w-1/4 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMore;
