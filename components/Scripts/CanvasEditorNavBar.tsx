/* eslint-disable @next/next/no-img-element */
import React from 'react';
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
import clx from 'classnames';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '@/styles/canvasnavbar.module.css';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import {
  ColorSelector,
  FillSelector,
} from './packages/extensions/color-selector';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
import useNitoonsHook from '@/hooks/useNitoonsHook';

const CanvasEditorNavBar = (props: { editor: any }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeAlign, setActiveAlign] = React.useState('J');
  const [anchorAlignEl, setAnchorAlignEl] = React.useState<null | HTMLElement>(
    null
  );
  const [activeLink, setActiveLink] = React.useState<boolean>(false);
  const [activeFont, setActiveFont] = React.useState<string | null>('Courier');
  const [activeTextStyle, setActiveTextStyle] = React.useState<string | null>(
    'Heading 1'
  );
  const [isColorOpen, setIsColorOpen] = React.useState(false);
  const [isFillOpen, setIsFillOpen] = React.useState(false);
  const [anchorFontEl, setAnchorFontEl] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorSizeEl, setAnchorSizeEl] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorSpacingEl, setAnchorSpacingEl] =
    React.useState<null | HTMLElement>(null);
  const [newFontSize, setNewFontSize] = React.useState<number>(16);
  const [newLineSpacing, setNewLineSpacing] = React.useState<string>('1.0');
  // const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const nitoonsHook = useNitoonsHook();

  const setLink = useCallback(() => {
    const previousUrl = props.editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      setActiveLink(false);
      return;
    }

    // empty
    if (url === '') {
      setActiveLink(false);
      props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    props.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
    setActiveLink(true);
  }, [props.editor]);

  // if (!props.editor) {
  //   return null
  // }
  // tippy('#undo', {
  //   content: 'Undo',
  //   placement: 'bottom',
  //   arrow: true,
  //   style: {
  //     'background-color': '#555',
  //     color: '#fff',
  //     textAlign: 'center',
  //     borderRadius: '4px',
  //     padding: '5px',
  //   },
  // });  

  const open = Boolean(anchorEl);
  const openFontType = Boolean(anchorFontEl);
  const openSizeType = Boolean(anchorSizeEl);
  const openSpacingType = Boolean(anchorSpacingEl);

  const handleAlignClick = (event: any) => {
    console.log('event: ', event.currentTarget);
    setAnchorAlignEl(event.currentTarget);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFontTypeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorFontEl(event.currentTarget);
  };
  const handleFontSizeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorSizeEl(event.currentTarget);
  };
  const handleFontSpacingClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorSpacingEl(event.currentTarget);
  };

  const handleAlignClose = () => {
    setAnchorAlignEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFontTypeClose = () => {
    setAnchorFontEl(null);
  };
  const handleFontSizeClose = () => {
    setAnchorSizeEl(null);
  };
  const handleFontSpacingClose = () => {
    setAnchorSpacingEl(null);
  };

  const handleImageChange = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.onchange = async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'nitoons');

        try {
          const response = await fetch(
            'https://api.cloudinary.com/v1_1/dondeickl/upload',
            {
              method: 'POST',
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            const imageUrl = data.secure_url;
            // setImageUrl(imageUrl);
            props.editor.chain().focus().setImage({ src: imageUrl }).run();
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  };

  const fontSizes = [10, 11, 12, 13, 14, 16, 18, 24, 30, 36, 48, 60];
  const lineHeights = ['1.0', '1.2', '1.5', '1.6', '1.8', '2.0', '2.4', '2.8', '3.0', '4.0', '5.0'];

  const handleChangeFontSize = (size: number) => {
    setNewFontSize(size);
    props.editor.chain().focus().fontSize({ fontSize: size }).run();
  };

  const handleChangeLineSpacing = (spacing: string) => {
    setNewLineSpacing(spacing);
    let floatNumber = parseFloat(spacing);
    props.editor
      .chain()
      .focus()
      .lineSpacing({ lineSpacing: floatNumber })
      .run();
  };

  const handleLink = () => {
    if (!activeLink) {
      setLink();
    } else {
      props.editor.chain().focus().unsetLink().run();
      setActiveLink(false);
    }
  };

  const CustomizedMenu = styled(Menu)`
  .MuiMenu-paper {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.16); !important;
  }
`;
  return (
    <Box component="main" sx={{ flexGrow: 1, width: '100vw' }}>
      {nitoonsHook.showRegularEditor && (
        <>
          <Toolbar />
          <Toolbar
            sx={{
              // height: '50px',
              boxShadow: '-3px 0px 9px 0px rgba(217, 217, 224, 0.60)',
              zIndex: theme => theme.zIndex.drawer + 2,
              display: 'flex',
              borderBottom: '1px solid #E2E2E2',
              backgroundColor: '#FFF',
              position: 'fixed',
            }}
          >
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
                padding: '5px 5px 5px 0',
              }}
            >
              <div className={styles.tooltip}>
              <button
                className={styles.button}
                id="undo"
                onClick={() => props.editor.chain().focus().undo().run()}
                disabled={!props.editor?.can().undo()}
              >
                <Image src="/gg_undo.svg" alt="Undo" width="20" height="20" />
              </button>
              <span className={styles.tooltiptext}>Undo</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  className={styles.button}
                  onClick={() => props.editor.chain().focus().redo().run()}
                  disabled={!props.editor?.can().redo()}
                >
                  <Image src="/gg_redo.svg" alt="Redo" width="20" height="20" />
                </button>
                <span className={styles.tooltiptext}>Redo</span>
              </div>
            </Paper>
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                padding: '5px',
              }}
              onClick={handleClick}
            >
              <div className={styles.tooltip}>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: 'max-content',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: '13px',
                      color: '#353538',
                      marginRight: '5px',
                    }}
                  >
                    {activeTextStyle}
                  </Typography>
                  <Image
                    src="/expand.svg"
                    alt="Expand"
                    width="14"
                    height="14"
                  />
                </button>
                <span className={styles.tooltiptext}>Styles</span>
              </div>
            </Paper>
            <CustomizedMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                className={
                  props.editor?.isActive('heading', { level: 4 })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor
                    .chain()
                    .focus()
                    .toggleNode('paragraph', 'paragraph')
                    .run();
                  setActiveTextStyle('Normal text');
                  handleClose();
                }}
              >
                <Typography>Normal text</Typography>
              </MenuItem>
              <MenuItem
                className={
                  props.editor?.isActive('heading', { level: 1 })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: 1 })
                    .run();
                  setActiveTextStyle('Heading 1');
                  handleClose();
                }}
              >
                <Typography style={{ fontWeight: 500 }}>Heading 1</Typography>
              </MenuItem>
              <MenuItem
                className={
                  props.editor?.isActive('heading', { level: 2 })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: 2 })
                    .run();
                  setActiveTextStyle('Heading 2');
                  handleClose();
                }}
              >
                <Typography style={{ fontWeight: 500, fontSize: '14px' }}>
                  Heading 2
                </Typography>
              </MenuItem>
              <MenuItem
                className={
                  props.editor?.isActive('heading', { level: 3 })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: 3 })
                    .run();
                  setActiveTextStyle('Heading 3');
                  handleClose();
                }}
              >
                <Typography>Heading 3</Typography>
              </MenuItem>
              <MenuItem
                className={
                  props.editor?.isActive('heading', { level: 4 })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: 4 })
                    .run();
                  setActiveTextStyle('Heading 4');
                  handleClose();
                }}
              >
                <Typography style={{ fontSize: '18px' }}>Heading 4</Typography>
              </MenuItem>
              <MenuItem
                // className={
                //   props.editor?.isActive('heading', { level: 4 }) ? 'is-active' : ''
                // }
                onClick={() => {
                  props.editor.chain().focus().setSubscript().run();
                  setActiveTextStyle('Subtitle');
                  handleClose();
                }}
                // disabled={props.editor?.isActive('subscript')}
              >
                <Typography style={{ fontSize: '14px' }}>Subtitle</Typography>
              </MenuItem>
            </CustomizedMenu>
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                padding: '5px',
              }}
              onClick={handleFontTypeClick}
            >
              <div className={styles.tooltip}>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: 'max-content',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: '13px',
                      color: '#D90368',
                    }}
                  >
                    {activeFont}
                  </Typography>
                  <Image
                    src="/expand.svg"
                    alt="Expand"
                    width="14"
                    height="14"
                  />
                </button>
                <span className={styles.tooltiptext}>Font</span>
              </div>
            </Paper>
            <CustomizedMenu
              anchorEl={anchorFontEl}
              open={openFontType}
              onClose={handleFontTypeClose}
            >
              <MenuItem
                className={
                  props.editor?.isActive('textStyle', { fontFamily: 'arial' })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor.chain().focus().setFontFamily('arial').run();
                  setActiveFont('Arial');
                  handleFontTypeClose();
                }}
              >
                <Typography style={{ fontFamily: 'Arial', fontSize: '13px' }}>
                  Arial
                </Typography>
              </MenuItem>
              <MenuItem
                className={
                  props.editor?.isActive('textStyle', {
                    fontFamily: 'times new roman',
                  })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor
                    .chain()
                    .focus()
                    .setFontFamily('times new roman')
                    .run();
                  setActiveFont('Times ...');
                  handleFontTypeClose();
                }}
              >
                <Typography
                  style={{ fontFamily: 'Times New Roman', fontSize: '13px' }}
                >
                  Times New Roman
                </Typography>
              </MenuItem>
              <MenuItem
                // Cambo
                className={
                  props.editor?.isActive('textStyle', {
                    fontFamily: 'Comic Sans MS, Comic Sans',
                  })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor
                    .chain()
                    .focus()
                    .setFontFamily('Comic Sans MS, Comic Sans')
                    .run();
                  setActiveFont('Comic sans');
                  handleFontTypeClose();
                }}
              >
                <Typography
                  style={{
                    fontFamily: 'Comic Sans MS, Comic Sans',
                    fontSize: '13px',
                  }}
                >
                  Comic sans
                </Typography>
              </MenuItem>
              <MenuItem
                // Roboto
                className={
                  props.editor?.isActive('textStyle', { fontFamily: 'Inter' })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor.chain().focus().setFontFamily('Inter').run();
                  setActiveFont('Inter');
                  handleFontTypeClose();
                }}
              >
                <Typography style={{ fontFamily: 'Roboto', fontSize: '13px' }}>
                  Inter
                </Typography>
              </MenuItem>
              <MenuItem
                className={
                  props.editor?.isActive('textStyle', { fontFamily: 'courier' })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor.chain().focus().setFontFamily('courier').run();
                  setActiveFont('Courier');
                  handleFontTypeClose();
                }}
              >
                <Typography style={{ fontFamily: 'Courier', fontSize: '13px' }}>
                  Courier
                </Typography>
              </MenuItem>
              <MenuItem
                // Saira
                className={
                  props.editor?.isActive('textStyle', { fontFamily: 'cursive' })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor.chain().focus().setFontFamily('cursive').run();
                  setActiveFont('cursive');
                  handleFontTypeClose();
                }}
              >
                <Typography style={{ fontFamily: 'Saira', fontSize: '13px' }}>
                  cursive
                </Typography>
              </MenuItem>
              <MenuItem
                // Tahoma
                className={
                  props.editor?.isActive('textStyle', {
                    fontFamily: 'monospace',
                  })
                    ? 'is-active'
                    : ''
                }
                onClick={() => {
                  props.editor.chain().focus().setFontFamily('monospace').run();
                  setActiveFont('monospace');
                  handleFontTypeClose();
                }}
              >
                <Typography style={{ fontFamily: 'Tahoma', fontSize: '13px' }}>
                  monospace
                </Typography>
              </MenuItem>
            </CustomizedMenu>
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                padding: '5px',
              }}
              onClick={handleFontSizeClick}
            >
              <div className={styles.tooltip}>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 500,
                      color: '#353538',
                      marginRight: '10px',
                    }}
                  >
                    {newFontSize}
                  </Typography>
                  <Image
                    src="/expand.svg"
                    alt="Expand"
                    width="14"
                    height="14"
                  />
                </button>
                <span className={styles.tooltiptext}>Font size</span>
              </div>
            </Paper>
            <CustomizedMenu
              anchorEl={anchorSizeEl}
              open={openSizeType}
              onClose={handleFontSizeClose}
            >
              {fontSizes.map((fontSize, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleChangeFontSize(fontSize);
                      handleFontSizeClose();
                    }}
                  >
                    <Typography
                      style={{ fontWeight: 500, padding: '0 15px 0 0' }}
                    >
                      {fontSize}
                    </Typography>
                  </MenuItem>
                );
              })}
            </CustomizedMenu>
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                padding: '5px 10px',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <div className={styles.tooltip}>
                <button
                  onClick={() =>
                    props.editor.chain().focus().toggleBold().run()
                  }
                  className={clx(
                    styles.headingButton,
                    props.editor?.isActive('bold') ? 'is-active' : ''
                  )}
                >
                  <Image src="/bold.svg" alt="Bold" width="18" height="18" />
                </button>
                <span className={styles.tooltiptext}>Bold</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  onClick={() =>
                    props.editor.chain().focus().toggleItalic().run()
                  }
                  className={clx(
                    styles.headingButton,
                    props.editor?.isActive('italic') ? 'is-active' : ''
                  )}
                >
                  <Image
                    src="/italic.svg"
                    alt="Italic"
                    width="18"
                    height="18"
                  />
                </button>
                <span className={styles.tooltiptext}>Italic</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  onClick={() =>
                    props.editor.chain().focus().toggleUnderline().run()
                  }
                  className={clx(
                    styles.headingButton,
                    props.editor?.isActive('underline') ? 'is-active' : ''
                  )}
                >
                  <Image
                    src="/underline.svg"
                    alt="Underline"
                    width="18"
                    height="18"
                  />
                </button>
                <span className={styles.tooltiptext}>Underline</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  onClick={() =>
                    props.editor.chain().focus().toggleStrike().run()
                  }
                  className={clx(
                    styles.headingButton,
                    props.editor?.isActive('strike') ? 'is-active' : ''
                  )}
                >
                  <Image
                    src="/strikethrough.svg"
                    alt="Strikethrough"
                    width="18"
                    height="18"
                  />
                </button>
                <span className={styles.tooltiptext}>Strike</span>
              </div>

              <div className={styles.tooltip}>
                {/* <button className={styles.headingButton}>
              <Image
                src="/text-color.svg"
                alt="Text Color"
                width="20"
                height="20"
              />
            </button> */}
                <ColorSelector
                  editor={props.editor}
                  isOpen={isColorOpen}
                  setIsOpen={setIsColorOpen}
                />
                {/* <span className={styles.tooltiptext}>Text Colour</span> */}
              </div>

              <div className={styles.tooltip}>
                {/* <button className={styles.headingButton}>
              <Image
                src="/text-fill.svg"
                alt="Text Fill"
                width="20"
                height="20"
              />
            </button> */}
                <FillSelector
                  editor={props.editor}
                  isOpen={isFillOpen}
                  setIsOpen={setIsFillOpen}
                />
                {/* <span className={styles.tooltiptext}>Text Fill</span> */}
              </div>
            </Paper>
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                padding: '5px',
              }}
              onClick={handleFontSpacingClick}
            >
              {/* <div className={styles.tooltip}> */}
              <button
                style={{
                  backgroundColor: 'transparent',
                  outline: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  width: 'max-content',
                }}
                title="Line & paragraph spacing"
              >
                <Typography
                  style={{
                    fontWeight: 500,
                    color: '#353538',
                    marginRight: '10px',
                  }}
                >
                  {newLineSpacing}
                </Typography>
                <Image src="/expand.svg" alt="Expand" width="14" height="14" />
              </button>
              {/* <span className={styles.tooltiptext}>Line & paragraph spacing</span> */}
              {/* </div> */}
            </Paper>
            <CustomizedMenu
              anchorEl={anchorSpacingEl}
              open={openSpacingType}
              onClose={handleFontSpacingClose}
            >
              {lineHeights.map((lineHeight, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleChangeLineSpacing(lineHeight);
                      handleFontSpacingClose();
                    }}
                  >
                    <Typography
                      style={{ fontWeight: 500, padding: '0 15px 0 0' }}
                    >
                      {lineHeight}
                    </Typography>
                  </MenuItem>
                );
              })}
            </CustomizedMenu>
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                padding: '5px',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <div className={styles.tooltip}>
                <button
                  className={styles.headingButton}
                  onClick={() =>
                    props.editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <Image
                    src="/ph_list-bullets.svg"
                    alt="Bullets"
                    width="20"
                    height="20"
                  />
                </button>
                <span className={styles.tooltiptext}>Bulleted list</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  className={styles.headingButton}
                  onClick={() =>
                    props.editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  <Image
                    src="/codicon_list-ordered.svg"
                    alt="Lists"
                    width="20"
                    height="20"
                  />
                </button>
                <span className={styles.tooltiptext}>Numbered list</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  className={styles.headingButton}
                  onClick={e => {
                    handleAlignClick(e);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: 'max-content',
                    flexDirection: 'row',
                  }}
                >
                  {activeAlign === 'L' && (
                    <FormatAlignLeftIcon fontSize="small" />
                  )}
                  {activeAlign === 'C' && (
                    <FormatAlignCenterIcon fontSize="small" />
                  )}
                  {activeAlign === 'R' && (
                    <FormatAlignRightIcon fontSize="small" />
                  )}
                  {activeAlign === 'J' && (
                    <FormatAlignJustifyIcon fontSize="small" />
                  )}
                  <Image
                    src="/expand.svg"
                    alt="Expand"
                    width="14"
                    height="14"
                  />
                </button>
                <span className={styles.tooltiptext}>Align and indent</span>
                <CustomizedMenu
                  anchorEl={anchorAlignEl}
                  open={Boolean(anchorAlignEl)}
                  onClose={handleAlignClose}
                >
                  <MenuItem
                    onClick={() => {
                      setActiveAlign('L');
                      props.editor.chain().focus().setTextAlign('left').run();
                      handleAlignClose();
                    }}
                    className={
                      props.editor?.isActive({ textAlign: 'left' })
                        ? 'is-active'
                        : ''
                    }
                    style={{
                      background: activeAlign === 'L' ? '#FFF2F8' : '#FFF',
                    }}
                  >
                    <FormatAlignLeftIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setActiveAlign('C');
                      props.editor.chain().focus().setTextAlign('center').run();
                      handleAlignClose();
                    }}
                    className={
                      props.editor?.isActive({ textAlign: 'center' })
                        ? 'is-active'
                        : ''
                    }
                    style={{
                      background: activeAlign === 'C' ? '#FFF2F8' : '#FFF',
                    }}
                  >
                    <FormatAlignCenterIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setActiveAlign('R');
                      props.editor.chain().focus().setTextAlign('right').run();
                      handleAlignClose();
                    }}
                    className={
                      props.editor?.isActive({ textAlign: 'right' })
                        ? 'is-active'
                        : ''
                    }
                    style={{
                      background: activeAlign === 'R' ? '#FFF2F8' : '#FFF',
                    }}
                  >
                    <FormatAlignRightIcon fontSize="small" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setActiveAlign('J');
                      props.editor
                        .chain()
                        .focus()
                        .setTextAlign('justify')
                        .run();
                      handleAlignClose();
                    }}
                    className={
                      props.editor?.isActive({ textAlign: 'justify' })
                        ? 'is-active'
                        : ''
                    }
                    style={{
                      background: activeAlign === 'J' ? '#FFF2F8' : '#FFF',
                    }}
                  >
                    <FormatAlignJustifyIcon fontSize="small" />
                  </MenuItem>
                </CustomizedMenu>
              </div>
            </Paper>
            <Paper
              square
              elevation={0}
              style={{
                borderRight: '1px solid #D9DCE0',
                borderRadius: 'none',
                padding: '5px',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
              }}
            >
              <div className={styles.tooltip}>
                <button
                  className={styles.headingButton}
                  style={{
                    backgroundColor: activeLink ? '#D90368' : '',
                  }}
                  onClick={handleLink}
                >
                  <Image
                    src="/fa_link.svg"
                    alt="Bullets"
                    width="15"
                    height="15"
                  />
                </button>
                <span className={styles.tooltiptext}>Insert Link</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  className={styles.headingButton}
                  onClick={() => {
                    handleImageChange();
                  }}
                  title="Insert Image"
                >
                  <Image
                    src="/uil_image.svg"
                    alt="Lists"
                    width="20"
                    height="16"
                  />
                </button>
                {/* <span className={styles.tooltiptext}>Insert Image</span> */}
              </div>
            </Paper>
            <Paper
              square
              elevation={0}
              style={{
                padding: '5px',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <div className={styles.tooltip}>
                <button
                  className={styles.headingButton}
                  onClick={() => props.editor.chain().focus().outdent().run()}
                >
                  <Image
                    src="/ic_outline-format-indent-decrease.svg"
                    alt="Bullets"
                    width="16"
                    height="16"
                  />
                </button>
                <span className={styles.tooltiptext}>Decrease indent</span>
              </div>

              <div className={styles.tooltip}>
                <button
                  className={styles.headingButton}
                  title="Increase indent"
                  onClick={() => props.editor.chain().focus().indent().run()}
                >
                  <Image
                    src="/ic_outline-format-indent-increase.svg"
                    alt="Lists"
                    width="18"
                    height="18"
                  />
                </button>
                <span className={styles.tooltiptext}>Increase indent</span>
              </div>
            </Paper>
          </Toolbar>
        </>
      )}
    </Box>
  );
};

export default CanvasEditorNavBar;
