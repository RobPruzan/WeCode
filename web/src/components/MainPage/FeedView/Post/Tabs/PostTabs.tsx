import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

import CodeIcon from '@mui/icons-material/Code';
import { CodeTab } from './CodeTab/CodeTab';
import { PostContent } from '../../../../../services/connections';
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
  const [currentPostInfo, setCurrentPostInfo] = useState<PostContent>({
    content: '',
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
