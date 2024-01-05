import React from 'react';
import {
  AppBar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import useNitoonsHook from '@/hooks/useNitoonsHook';
import { useRouter } from 'next/router';
import { GetUserAuthToken } from '@/services/config';
import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import { scriptAIChat } from '@/services/api-requests/api-request';
import { Message } from 'ai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const drawerWidth = 290;

const CanvasRightDrawer = () => {
  const [userText, setUserText] = React.useState('');
  const [aiUserResponse, setAiUserResponse] = React.useState<any>([]);
  // const [aiAsstResponse, setAiAsstResponse] = React.useState<null>(null);
  const [userId, setUserId] = React.useState('');
  const [scriptId, setScriptId] = React.useState<string>('');
  const [aILoading, setAILoading] = React.useState<boolean>(false);
  const [aICircularLoading, setAICircularLoading] =
    React.useState<boolean>(false);
  const [showAiResponse, setShowAiResponse] = React.useState<boolean>(true);

  const router = useRouter();
  const nitoonsHook = useNitoonsHook();
  const token = GetUserAuthToken();

  React.useEffect(() => {
    const id = localStorage.getItem('user_id') as string;
    typeof id === 'string' && setUserId(id);
    const scriptId = router.query?.canvas_id;
    typeof scriptId === 'string' && setScriptId(scriptId);
    console.log('SCRIPT_ID: ', scriptId);
    // const token = GetUserAuthToken();
  }, [router.query?.canvas_id]);

  const handleTextChange = (e: any) => {
    const newText = e.target.value;
    setUserText(newText);
  };

  const getAiSuggestions = async () => {
    console.log('user-text: ', userText);
    setAILoading(true);
    setAICircularLoading(true);
    const AIResponse = await scriptAIChat({
      userId,
      scriptId,
      messages: userText,
      token,
    });
    setUserText('');
    const AIResponseData = AIResponse?.data?.data;
    // const response = AIResponseData.map((res: any) => res.content)
    // console.log("AI Content: ", response);
    console.log('AI response: ', AIResponseData);
    setAiUserResponse(AIResponseData)
    // AIResponseData.map((res: any) => {
    //   if (res.role === 'user') {
    //     // console.log('USER: ', res.content);
    //     setAiUserResponse(res.content)
    //   }
    //   if (res.role === 'assistant') {
    //     // console.log('ASSISTANT: ', res.content);
    //     setAiAsstResponse(res.content)
    //   }
    // })
    // setAiResponse(AIResponseData);
    setAILoading(false);
    setAICircularLoading(false);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      getAiSuggestions();
    }
  };

  const handleClearChat = () => {
    setShowAiResponse(false);
    setAiUserResponse([]);
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: drawerWidth,
          maxHeight: '100vh',
          flexShrink: 0,
          overflowY: 'auto',
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: 16,
            paddingRight: '10px',
            paddingLeft: '10px',
            paddingBottom: '130px',
            zIndex: theme =>
              `${
                nitoonsHook.showRegularEditor
                  ? theme.zIndex.drawer + 2
                  : theme.zIndex.drawer + 1
              }`,
          },
        }}
      >
        <Box sx={{ overflowY: 'auto' }}>
          {aiUserResponse.length !== 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxWidth: '250px',
                margin: '20px auto 0',
                alignContent: 'flex-end',
              }}
            >
              {aiUserResponse.map((response: any, index: number) => {
                if (response.role === 'user') {
                  return (
                  <Typography
                    key={index}
                    style={{
                      backgroundColor: '#D90368',
                      justifyItems: 'flex-end',
                      color: 'white',
                      maxWidth: '80%',
                      borderRadius: '6px',
                      padding: '7px 15px',
                      fontSize: '14px'
                    }}
                  >
                    {response.content}
                  </Typography>
                  )
                }
                if (response.role === 'assistant') {
                  return (
                    <Paper
                      key={index}
                      elevation={0}
                      style={{
                        maxWidth: 220,
                        margin: '8px auto 10px',
                        backgroundColor: '#EEEEF2',
                        padding: '10px',
                      }}
                    >
                      {showAiResponse && (
                        <Typography style={{ fontSize: '14px' }}>
                          {response.content}
                        </Typography>
                      )}
                    </Paper>
                  )
                }
              })}
            </div>
          )}

          {aiUserResponse.length === 0 && (
            <>
              <Paper
                elevation={0}
                sx={{
                  textAlign: 'center',
                  maxWidth: 180,
                  margin: '40px auto 20px',
                }}
              >
                <Typography style={{ fontSize: 20, fontWeight: '500' }}>
                  Chat with AI
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  Unlock creative solutions and generate script ideas with our
                  AI chatbox.
                </Typography>
              </Paper>
              <div style={{ overflowY: 'auto' }}>
                {!aILoading ? (
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: '#2C2C3E',
                      color: '#B5B7BB',
                      maxWidth: '200px',
                      padding: '15px',
                      margin: '0 auto 10px',
                      borderRadius: '8px',
                    }}
                  >
                    <Typography
                      style={{ fontWeight: '500', paddingBottom: '10px' }}
                    >
                      Specify Chapters
                    </Typography>
                    <Typography style={{ fontSize: '12px' }}>
                      Specify the exact chapters, sections, or content
                      you&apos;re interested in
                    </Typography>
                  </Paper>
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={180}
                    height={120}
                    sx={{ backgroundColor: '#fcf0f7;' }}
                    style={{ margin: '10px auto 20px' }}
                  ></Skeleton>
                )}
                {!aILoading ? (
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: '#2C2C3E',
                      color: '#B5B7BB',
                      maxWidth: '200px',
                      padding: '15px',
                      margin: '0 auto 10px',
                      borderRadius: '8px',
                    }}
                  >
                    <Typography
                      style={{ fontWeight: '500', paddingBottom: '10px' }}
                    >
                      Use Context
                    </Typography>
                    <Typography style={{ fontSize: '12px' }}>
                      Use concise language, including essential details while
                      avoiding excess information.
                    </Typography>
                  </Paper>
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={180}
                    height={120}
                    sx={{ backgroundColor: '#fcf0f7;' }}
                    style={{ margin: '20px auto' }}
                  ></Skeleton>
                )}
                {!aILoading ? (
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: '#2C2C3E',
                      color: '#B5B7BB',
                      maxWidth: '200px',
                      padding: '15px',
                      margin: '0 auto 10px',
                      borderRadius: '8px',
                      marginBottom: '150px',
                    }}
                  >
                    <Typography
                      style={{ fontWeight: '500', paddingBottom: '10px' }}
                    >
                      Use Follow-Up Questions
                    </Typography>
                    <Typography style={{ fontSize: '12px' }}>
                      Unlock creative solutions and generate script ideas with
                      our AI chatbox.
                    </Typography>
                  </Paper>
                ) : (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={180}
                    height={120}
                    sx={{ backgroundColor: '#fcf0f7;' }}
                    style={{ margin: '20px auto' }}
                  ></Skeleton>
                )}
              </div>
            </>
          )}

          <div style={{ marginBottom: `${aiUserResponse.length !== 0 ? '120px': ''}`, textAlign: 'center' }}>
            {showAiResponse ? (
              <>
                {aiUserResponse.length !== 0 && (
                  <Button
                    variant="contained"
                    style={{ textTransform: 'capitalize' }}
                    size="small"
                    disableElevation
                    onClick={handleClearChat}
                  >
                    Clear Chat
                  </Button>
                )}
              </>
            ) : (
              ''
            )}
          </div>
          {/* Text field */}
          <Paper
            elevation={0}
            sx={{
              marginTop: '45px',
              position: 'fixed',
              outline: 'none',
              border: 'none',
              marginLeft: '30px',
              bottom: 3,
              right: 30,
            }}
          >
            <TextField
              id="outlined-multiline-flexible"
              placeholder="Ask me anything"
              multiline
              minRows={3}
              style={{
                border: '0.1px solid #D0D5DD',
                borderRadius: '10px',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ marginBottom: '40px', cursor: 'pointer' }}
                    onClick={getAiSuggestions}
                  >
                    {aICircularLoading ? (
                      <CircularProgress
                        size={20}
                        style={{ color: '#D90368' }}
                      />
                    ) : (
                      <Send size="20px" color="#A5A7AA" />
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={handleTextChange}
              onKeyDown={handleEnterKeyPress}
              value={userText}
            />
          </Paper>
        </Box>
      </Drawer>
    </div>
  );
};

export default CanvasRightDrawer;

// function ChatMessage({ message: { role, content } }: { message: Message }) {
//   return (
//     <div>
//       <div>{role}</div>
//       <div>{content}</div>
//     </div>
//   );
// }
