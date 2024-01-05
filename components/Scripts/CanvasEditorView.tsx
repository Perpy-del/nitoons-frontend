import * as React from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  ToggleButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '@/styles/canvasnavbar.module.css';
import iconStyles from '@/styles/canvasnavbar.module.css';
import FilmCutIcon from './ScriptEditorIcons/FilmCutIcon';
import ActionIcon from './ScriptEditorIcons/ActionIcon';
import CharacterIcon from './ScriptEditorIcons/CharacterIcon';
import Parenthetical from './ScriptEditorIcons/Parenthetical';
import DialogueIcon from './ScriptEditorIcons/DialogueIcon';
import TransitionIcon from './ScriptEditorIcons/TransitionIcon';
import GeneralIcon from './ScriptEditorIcons/GeneralIcon';
import ScriptNotes from './ScriptEditorIcons/ScriptNotes';
import RenumberIcon from './ScriptEditorIcons/RenumberIcon';
import CommentsIcon from './ScriptEditorIcons/CommentsIcon';
import CanvasEditor from './CanvasEditor';
import useNitoonsHook from '@/hooks/useNitoonsHook';
import { DivideSquareIcon } from 'lucide-react';

const CanvasEditorView = (props: { editor: any, instances: Array<any> }) => {
  const nitoonsHook = useNitoonsHook();
  
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container disableGutters sx={{ backgroundColor: '#D9DCE0' }}>
      <Box component="main">
        {nitoonsHook.showScreenplayEditor &&
        <>
        <Toolbar />
        <Toolbar
          sx={{
            // height: '48px',
            boxShadow: '-3px 0px 9px 0px rgba(217, 217, 224, 0.60)',
            zIndex: theme =>
              `${
                nitoonsHook.showRegularEditor
                  ? theme.zIndex.drawer + 1
                  : theme.zIndex.drawer + 2
              }`,
            display: 'flex',
            justifyContent: `${
              nitoonsHook.showRegularEditor
                ? 'space-between'
                : 'space-around'
            }`,
            border: '1px solid #E2E2E2',
            backgroundColor: '#FFFFFF',
            position: 'fixed',
            width: nitoonsHook.showRegularEditor ? '55vw' : '80vw',
          }}
        >
          <Paper
            elevation={0}
            style={{
              // padding: '5px',
              display: 'flex',
              // gap: 2,
              alignItems: 'flex-end',
              // margin: '0 auto',
            }}
          >
            <button
              className={iconStyles.headingButton}
              onClick={() => {
                nitoonsHook.setFilmCut(true)
                // props.handleSceneHeading()
                // props.editor.chain().focus().toggleBold().run()
              }
              }
            >
              <FilmCutIcon />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().scene().run()}
            >
              <ActionIcon />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().character().run()}
            >
              <CharacterIcon />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().parenthetical().run()}
            >
              <Parenthetical />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().dialogue().run()}
            >
              <DialogueIcon />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().transition().run()}
            >
              <TransitionIcon />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().general().run()}
            >
              <GeneralIcon />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().script().run()}
            >
              <ScriptNotes />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().renumber().run()}
            >
              <RenumberIcon />
            </button>

            <button
              className={iconStyles.headingButton}
              onClick={() => props.editor.chain().focus().dual().run()}
            >
              <CommentsIcon />
            </button>
          </Paper>
          <Paper
            square
            elevation={0}
            style={{
              padding: '5px',
              // marginRight: '30px'
              // display: 'flex',
              // justifyContent: 'flex-end',
            }}
          >
            {nitoonsHook.showRegularEditor ? (
              <>
                {nitoonsHook.showRegularEditor && (
                  <button
                    className={styles.collapseButton}
                    onClick={() => {
                      nitoonsHook.setShowRegularEditor(false);
                    }}
                    title={'Close Regular Editor'}
                  >
                    <Image
                      src="/collapse.svg"
                      alt="Collapse"
                      width="22"
                      height="22"
                    />
                  </button>
                )}
              </>
            ) : (
              <button
                className={styles.collapseButton}
                onClick={() => {
                  nitoonsHook.setShowRegularEditor(true);
                }}
                title={'Open Regular Editor'}
              >
                <Image
                  src="/collapse-down.svg"
                  alt="Collapse"
                  width="22"
                  height="22"
                />
              </button>
            )}
          </Paper>
        </Toolbar>
        </>}
        <Toolbar />
        <Toolbar
          sx={{
            minHeight: '40px !important',
            boxShadow: '-3px 0px 9px 0px rgba(217, 217, 224, 0.60)',
            zIndex: theme => theme.zIndex.drawer + 1,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0px 90px',
            width: '55.4%',
            borderRight: '1px solid #E2E2E2',
            borderBottom: '1px solid #E2E2E2',
            background: '#FFF',
            position: 'fixed',
            flexGrow: 1,
            // marginLeft:"20px"
          }}
        >
          <Paper
            elevation={0}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Image src="/mdi_dot.svg" alt="dot" width="24" height="24" />
            <Typography style={{ color: '#9B9B9B' }}>
              {nitoonsHook.scriptTitle}
            </Typography>
          </Paper>
          <Paper
            elevation={0}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <button className={styles.headingButton} title={'Scroll to bottom'} onClick={scrollToBottom} style={{scrollBehavior: 'smooth'}}>
              <Image src="/arrow-up.svg" alt="dot" width="24" height="24" />
            </button>
            <button className={styles.headingButton} title={'Scroll to top'} onClick={scrollToTop} style={{scrollBehavior: 'smooth'}}>
              <Image src="/arrow-down.svg" alt="dot" width="24" height="24" />
            </button>
          </Paper>
        </Toolbar>
      </Box>
      {props.instances.map((editor: any, index: number) => {
        return (
          <CanvasEditor editor={props.editor} key={index} />
        )
      })}
    </Container>
  );
};

export default CanvasEditorView;
