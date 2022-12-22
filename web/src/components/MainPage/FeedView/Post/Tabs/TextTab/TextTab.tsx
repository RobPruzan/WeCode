import React, { Dispatch, SetStateAction } from 'react';
import { PostContent } from '../../../../../../services/connections';
import { SendPost } from '../../Buttons/SendPost';
import { InputText } from './InputText';
export type TextTabProps = {
  setCurrentPostInfo: Dispatch<SetStateAction<PostContent>>;
  currentPostInfo: PostContent;
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
};

export const TextTab = ({
  currentPostInfo,
  setPostedContent,
  setCurrentPostInfo,
}: TextTabProps) => {
  return (
    <>
      <InputText
        setCurrentPostInfo={setCurrentPostInfo}
        currentPostInfo={currentPostInfo}
      />
      <SendPost
        setCurrentPostInfo={setCurrentPostInfo}
        currentPostInfo={currentPostInfo}
        setPostedContent={setPostedContent}
      />
    </>
  );
};
