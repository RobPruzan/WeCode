import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CodeIcon from '@mui/icons-material/Code';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { TextTab } from './TextTab/TextTab';
import { CodeTab } from './CodeTab/CodeTab';
import { PostContent } from '../../../../../services/connections';
import { UpDownVoting } from '../../PostedContents/UpDownVoting';

export enum TabType {
  'TEXT',
  'CODE',
}

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

  return (
    <div>
      <div
        className={className}
        style={{
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
          {/* <TabPanel value={'Text'}>
            <h1>Text</h1>
          </TabPanel> */}
          {/* <TabPanel value="lol" /> */}
          {/* <TabPanel value={'Code'}>
            <h1>Code</h1>
          </TabPanel> */}
        </Tabs>
        {activeTab === TabType.TEXT && (
          <TextTab
            currentPostInfo={currentPostInfo}
            setCurrentPostInfo={setCurrentPostInfo}
            setPostedContent={setPostedContent}
          />
        )}
        {activeTab === TabType.CODE && (
          <CodeTab
            currentPostInfo={currentPostInfo}
            setCurrentPostInfo={setCurrentPostInfo}
            setPostedContent={setPostedContent}
          />
        )}
      </div>
    </div>
  );
};
