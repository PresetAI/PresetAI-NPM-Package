import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { PresetAIChatbot } from '../Chatbot';

export interface SearchProps {
  user_api_key: string;
  project_api_key: string;
  style?: React.CSSProperties;
  placeholder?: string;
  isPinnable?: boolean;
}

export const PresetAISearchBar: React.FC<SearchProps> = ({style, placeholder="Search...", user_api_key, project_api_key }: SearchProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <PresetAIChatbot open={open} setOpen={setOpen} user_api_key={user_api_key} project_api_key={project_api_key} />
      <div className="PresetAI-search" onClick={handleClickOpen} style={style}>
        <SearchOutlinedIcon />
        <input
          className="PresetAI-search-input"
          placeholder={placeholder}
          readOnly={true}
        />
        <div className="PresetAI-search-command">⌘K</div>
      </div>
    </>

  );
};
