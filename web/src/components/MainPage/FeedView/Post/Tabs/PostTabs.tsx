import CodeIcon from '@mui/icons-material/Code';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { PostContent } from '../../../../../services/connections';
import { CodeTab } from './CodeTab/CodeTab';
import { TextTab } from './TextTab/TextTab';

import { SelectChangeEvent } from '@mui/material';

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
};
export const PostTabs = ({
  className,
  setPostedContent,
  isPostLoading,
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
          />
        )}
        {activeTab === TabType.CODE && (
          <CodeTab
            currentPostInfo={currentPostInfo}
            setCurrentPostInfo={setCurrentPostInfo}
            setPostedContent={setPostedContent}
            flairChangeHandler={flairChangeHandler}
          />
        )}
      </div>
    </div>
  );
};
