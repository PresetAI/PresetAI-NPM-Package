import * as React from 'react';
// import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ChatbotProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  user_api_key: string;
  project_api_key: string;
}

export interface Question{
  user_api_key: string;
  project_api_key: string;
  question: string;
}

export const PresetAIChatbot: React.FC<ChatbotProps> = ({ open, setOpen, user_api_key, project_api_key }: ChatbotProps) => {
  const [isTyping, setIsTyping] = useState<boolean>(false); // is typing]
  const [userMessage, setUserMessage] = useState<string>(''); // user input
  const [messages, setMessages] = useState<any[]>([
    {
      message: '👋 Hello, How I can help you today?',
      sender: 'ChatGPT',
      suggestion: null,
    },
  ]);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  /*
   * Send message to backend and get response
   * */
  const processMessage = async (chatMessages: any) => {
    setUserMessage('');
    const body: Question = {
      user_api_key: user_api_key,
      project_api_key: project_api_key,
      question: chatMessages,
    };
    const response = await fetch(`https://thepresetai.com/api/project/do_chat_server`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if (response.body) {
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      const newMessage = {
        message: '',
        sender: 'ChatGPT',
        suggestion: null,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // add prevMessages + value to last message in messages
        setMessages((prevMessages) => {
          // Create a copy of the last message and update its message field
          const updatedLastMessage = {
            ...prevMessages[prevMessages.length - 1],
            message: prevMessages[prevMessages.length - 1].message + value,
          };

          // Replace the last message in the array with the updated version
          return [...prevMessages.slice(0, -1), updatedLastMessage];
        });
      }
    }

    setIsTyping(false);
  };

  /*
   * Handle send message / ask question
   * */
  const handleSend = async (e: any) => {
    e.preventDefault();
    setIsTyping(true);
    const newMessage = {
      message: userMessage,
      sender: 'user',
      suggestion: null,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Initial system message
    await processMessage(userMessage);
  };

  return (
    <>
      {open && (
      // <Dialog onClose={handleClose} open={true} fullWidth={true} maxWidth="md" sx={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
        <div className="modal">
          <div className='overlay' onClick={handleClose}></div>
          <div className="PAI-flex PAI-flex-col PAI-rounded-xl PAI-w-full PAI-max-h-40rem modal-content">
            <div className="PAI-flex PAI-flex-col PAI-overflow-auto PAI-p-4">
              <div>
                {messages.map((message) => {
                  return (
                    <div key={message.message}>
                      {message.sender === 'ChatGPT' ||
                      message.sender === 'assistant' ? (
                        <div className="PAI-flex PAI-p-4 gap-2 PAI-backdrop-blur-lg PAI-rounded-md">
                          <div className="PAI-w-8 PAI-h-8 PAI-border-1 PAI-p-1 PAI-rounded-lg">
                            <img
                              className="PAI-rounded-xl PAI-w-8 PAI-h-8"
                              src="https://cs410032002121be004.blob.core.windows.net/preset/logo.svg"
                              alt="bot"
                            />
                          </div>
                          <div className="PAI-flex PAI-w-full PAI-pl-3 PAI-mt-1">
                            <div className="text-gray-600">
                              <ReactMarkdown
                                remarkPlugins={[
                                  [remarkGfm, { singleTilde: false }],
                                ]}
                                className="prose prose-slate dark:text-gray-50 PAI-p-0"
                              >
                                {message.message}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="PAI-flex PAI-items-center PAI-gap-2 PAI-my-6">
                          <div className="PAI-ml-auto PAI-flex PAI-flex-col">
                            <div className="PAI-primary PAI-text-white PAI-shadow-lg PAI-p-3 PAI-rounded-xl">
                              {message.message}
                            </div>
                          </div>
                          <div className="PAI-flex PAI-items-center PAI-justify-center PAI-border-2 border-primary PAI-w-8 PAI-h-8 PAI-rounded-md">
                            <PersonRoundedIcon />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="text-black mt-2 flex gap-2">
                    {/*<UseAnimations animation={loading} />*/}
                    <div>Thinking...</div>
                  </div>
                )}
              </div>
            </div>
            <div className="PAI-mt-auto PAI-py-6">
              <form className="PAI-flex PAI-items-center" onSubmit={(e) => handleSend(e)}>
                <div className="PAI-flex PAI-items-center PAI-w-full">
                  <div className="PAI-absolute PAI-left-4 PAI-flex PAI-items-center PAI-pl-3 PAI-pointer-events-none">
                    <SearchRoundedIcon />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="text-muted-foreground PAI-w-full PAI-border-0 PAI-text-sm PAI-bg-slate-200-20 PAI-rounded-lg focus:ring-black focus:border-black PAI-w-full PAI-pl-10 PAI-p-2-5 PAI-py-3 dark:placeholder-gray-400"
                    placeholder="Chat here..."
                    value={userMessage}
                    autoComplete="off"
                    required
                    onChange={(e: any) => setUserMessage(e.target.value)}
                  />
                </div>
                {isTyping || userMessage.length === 0 ? (
                  <div
                    className="PAI-flex PAI-items-center PAI-text-white PAI-p-2 PAI-ml-2 PAI-text-sm PAI-font-medium PAI-bg-gray-600 PAI-rounded-xl"
                  >
                    <SendRoundedIcon />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="PAI-flex PAI-items-center PAI-bg-black PAI-text-white PAI-p-2 PAI-ml-2 PAI-text-sm PAI-font-medium PAI-shadow-xl PAI-rounded-xl"
                    onClick={(e) => handleSend(e)}
                  >
                    <SendRoundedIcon />
                  </button>
                )}
              </form>
              <div className="PAI-flex PAI-ml-auto PAI-text-sm PAI-py-3">
                <p>Power by &nbsp;</p>
                <p className="PAI-font-medium">PresetAI</p>
              </div>
            </div>
          </div>
        </div>
      // </Dialog>
      )}
    </>

  );
};
