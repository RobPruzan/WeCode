import React, { Dispatch, SetStateAction } from 'react';

import { AiFillEdit } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';
import { CodeTab } from './CodeTab/CodeTab';
import { InputText } from './TextTab/InputText';
import { PostContent } from '../../../../../services/connections';
import { SelectChangeEvent } from '@mui/material';

export type PostPopupProps = {
  postButtonToggled: boolean;
  setPostButtonToggled: Dispatch<SetStateAction<boolean>>;
  currentPostInfo: PostContent;
  setCurrentPostInfo: Dispatch<SetStateAction<PostContent>>;
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
  flairChangeHandler: (event: SelectChangeEvent<string>) => void;
  postedContent: PostContent[];

  // changeHandler={changeHandler}
  // currentPostInfo={currentPostInfo}
  // setCurrentPostInfo={setCurrentPostInfo}
  // setPostedContent={setPostedContent}
  // flairChangeHandler={flairChangeHandler}
  // postedContent={postedContent}
  // changeHandler={changeHandler}
  //               value={currentPostInfo.content}
};
const PostPopup = ({
  postButtonToggled,
  setPostButtonToggled,
  currentPostInfo,
  flairChangeHandler,
  postedContent,
  setCurrentPostInfo,
  setPostedContent,
}: PostPopupProps) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPostInfo(prev => ({ ...prev, content: event.target.value }));
  };
  return (
    <>
      {postButtonToggled ? (
        <div
          style={{
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <div
            style={{
              marginTop: '-125px',
            }}
            className="flex flex-col  justify-center items-center h-full w-full"
          >
            <div
              style={{
                width: '50vw',
              }}
              className="border-2  border-neon-blue border-b-0 bg-custom-dark-gray rounded-t-lg"
            >
              <div className="border-b-2 border-neon-blue">
                <BsXLg
                  size={28}
                  onClick={() => setPostButtonToggled(!postButtonToggled)}
                  className="cursor-pointer  ml-auto my-2 mr-2"
                >
                  <button
                    style={{
                      position: 'fixed',

                      bottom: 0,
                    }}
                    className="px-5  py-2 text-xl rounded-lg  text-white bg-neon-blue"
                  ></button>
                </BsXLg>
              </div>

              <InputText
                changeHandler={changeHandler}
                value={currentPostInfo.content}
                rows={6}
              />
            </div>
            <div
              style={{
                width: '50vw',
              }}
              className="border-2 border-t-0 border-neon-blue bg-custom-dark-gray rounded-b-lg"
            >
              <CodeTab
                setPostButtonToggled={setPostButtonToggled}
                currentPostInfo={currentPostInfo}
                setCurrentPostInfo={setCurrentPostInfo}
                setPostedContent={setPostedContent}
                flairChangeHandler={flairChangeHandler}
                postedContent={postedContent}
              />
            </div>
          </div>
        </div>
      ) : (
        <AiFillEdit
          onClick={() => setPostButtonToggled(!postButtonToggled)}
          size={50}
          className=" shadow-2xl cursor-pointer"
          style={{
            zIndex: 30,

            position: 'fixed',
            // top: 0,
            right: 20,
            bottom: 20,
            // left: 0,
          }}
        />
      )}
    </>
  );
};

export default PostPopup;
