import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { PresetAIChatbot } from '../Chatbot';

export interface SearchProps {
  style?: React.CSSProperties;
  placeholder?: string;
  isPinnable?: boolean;
}

export const PresetAISearchBar: React.FC<SearchProps> = ({style, placeholder="Search..." }: SearchProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <PresetAIChatbot open={open} setOpen={setOpen} />
      <div className="PresetAI-search" onClick={handleClickOpen}>
        <SearchOutlinedIcon />
        <input
          style={style}
          className="PresetAI-search-input"
          placeholder={placeholder}
          readOnly={true}
        />
        <div className="PresetAI-search-command">⌘K</div>
      </div>
    </>

  );
};
