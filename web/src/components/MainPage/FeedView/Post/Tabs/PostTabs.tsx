import { BsXCircle, BsXLg } from 'react-icons/bs';
import { CodeTab, DEFAULT_PROGRAMMING_LANGUAGE } from './CodeTab/CodeTab';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

import { AiFillEdit } from 'react-icons/ai';
import CodeIcon from '@mui/icons-material/Code';
import { InputText } from './TextTab/InputText';
import { PostContent } from '../../../../../services/connections';
import PostPopup from './PostPopup';
import { SelectChangeEvent } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { TextTab } from './TextTab/TextTab';

export enum TabType {
  'TEXT',
  'CODE',
}
export const FLAIRS = [
  'Help',
  'Discussion',
  'Question',
  'Showcase',
  'Announcement',
  'News',
];

export const DEFAULT_FLAIR = 'Discussion';
export type TabsProps = {
  className?: string;
  setPostedContent: Dispatch<SetStateAction<PostContent[]>>;
  isPostLoading: boolean;
  postedContent: PostContent[];
};
export const PostTabs = ({
  className,
  setPostedContent,
  isPostLoading,
  postedContent,
}: TabsProps) => {
  const [postButtonToggled, setPostButtonToggled] = useState(false);
  const [currentPostInfo, setCurrentPostInfo] = useState<PostContent>({
    content: '',
    flair: DEFAULT_FLAIR,
  });
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const flairChangeHandler = (event: SelectChangeEvent<string>) => {
    setCurrentPostInfo({
      ...currentPostInfo,
      flair: event.target.value,
    });
  };

  return (
    <div>
      <div
        className={className}
        style={{
          minWidth: 'min-content',
          background: '#141414',
          border: '1px solid #43bbff',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="tabs"
          variant="fullWidth"
          sx={{
            background: '#141414',
          }}
        >
          <Tab
            value={TabType.TEXT}
            icon={<TextFieldsIcon />}
            aria-label="text"
            sx={{
              color: 'gray',
            }}
          />

          <Tab
            sx={{
              color: 'gray',
            }}
            value={TabType.CODE}
            icon={<CodeIcon />}
            aria-label="code"
          />
        </Tabs>
        <PostPopup
          postButtonToggled={postButtonToggled}
          setPostButtonToggled={setPostButtonToggled}
          currentPostInfo={currentPostInfo}
          flairChangeHandler={flairChangeHandler}
          postedContent={postedContent}
          setPostedContent={setPostedContent}
          setCurrentPostInfo={setCurrentPostInfo}
        />

        {activeTab === TabType.TEXT && (
          <TextTab
            currentPostInfo={currentPostInfo}
            setCurrentPostInfo={setCurrentPostInfo}
            setPostedContent={setPostedContent}
            flairChangeHandler={flairChangeHandler}
            postedContent={postedContent}
          />
        )}
        {activeTab === TabType.CODE && (
          <CodeTab
            currentPostInfo={currentPostInfo}
            setCurrentPostInfo={setCurrentPostInfo}
            setPostedContent={setPostedContent}
            flairChangeHandler={flairChangeHandler}
            postedContent={postedContent}
          />
        )}
      </div>
    </div>
  );
};
