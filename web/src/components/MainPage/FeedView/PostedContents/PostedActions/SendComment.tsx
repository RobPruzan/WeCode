import {
  CommentContent,
  PostContent,
  User,
} from '../../../../../services/connections';
import React, { useEffect, useState } from 'react';

import Collapsible from 'react-collapsible';
import CommentIcon from '@mui/icons-material/Comment';
import Comments from './Comments';
import { InputText } from '../../Post/Tabs/TextTab/InputText';
import { PrimaryCard } from '../../../../PrimaryCard';
import { RootState } from '../../../../../redux/store';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { useSendComment } from '../../../../../hooks/PostHooks/useSendComment';

export type SendCommentProps = {
  className?: string;
  singlePostedContent: PostContent;
};
export const SendComment = ({
  className,
  singlePostedContent,
}: SendCommentProps) => {
  const user = useSelector(({ userState }: RootState) => userState.user);
  const [isExpanded, setExpanded] = useState(false);
  const sendCommentMutation = useSendComment(singlePostedContent.id ?? 0);
  const [commentInfo, setCommentInfo] = useState<CommentContent | null>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user?.id && singlePostedContent.id) {
      setCommentInfo({
        content: event.target.value,
        user: {
          name: user.name,
          id: user.id,
          friends: user.followers,
          followers: user.followers,
          following: user.following,
        } satisfies User,
        postId: singlePostedContent.id,
        upVotes: 0,
        reply_to: null,
      });
    }
  };
  console.log('AN id', singlePostedContent.id);

  return (
    <Collapsible
      className={className}
      overflowWhenOpen="visible"
      onOpen={() => setExpanded(true)}
      onClose={() => setExpanded(false)}
      trigger={
        <PrimaryCard
          className="d-flex justify-content-center p-1 "
          style={{
            maxWidth: '93%',
          }}
        >
          <CommentIcon
            style={{
              fill: isExpanded ? 'gray' : '#43bbff',
            }}
          />
        </PrimaryCard>
      }
      transitionTime={150}
    >
      <br />
      <PrimaryCard
        style={{
          width: '100% !important',
          maxWidth: '93%',
        }}
        className="d-flex justify-content-center p-3"
      >
        <InputText
          changeHandler={changeHandler}
          value={commentInfo?.content ?? ''}
          rows={7}
          style={{ width: '100% !important' }}
        />
        <SendIcon
          className="cursor-pointer hover:scale-105 hover:fill-sky-300"
          onClick={() => {
            if (commentInfo) {
              sendCommentMutation.mutate(commentInfo);
              setCommentInfo(null);
            }
          }}
        />
      </PrimaryCard>
      <div className="p-3">
        {singlePostedContent.id && <Comments postId={singlePostedContent.id} />}
      </div>
    </Collapsible>
  );
};
