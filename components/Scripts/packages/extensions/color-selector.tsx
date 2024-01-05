import { Editor } from "@tiptap/core";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Divider } from "@mui/material";
import styles from '@/styles/colorselector.module.css'
import Image from "next/image";

export interface BubbleColorMenuItem {
    name: string;
    color: string;
  }

  interface ColorSelectorProps {
    editor: Editor;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }
  
  const TEXT_COLORS: BubbleColorMenuItem[] = [
    {
      name: "Default",
      color: "#353538",
    },
    {
      name: "Purple",
      color: "#9333EA",
    },
    {
      name: "Red",
      color: "#E00000",
    },
    {
      name: "Yellow",
      color: "#EAB308",
    },
    {
      name: "Blue",
      color: "#2563EB",
    },
    {
      name: "Green",
      color: "#008A00",
    },
    {
      name: "Orange",
      color: "#FFA500",
    },
    {
      name: "Pink",
      color: "#BA4081",
    },
    {
      name: "Gray",
      color: "#A8A29E",
    },
    {
      name: "White",
      color: "#FFFFFF"
    },
    {
      name: "Beige",
      color: "#FE6244"
    },
    {
      name: "White",
      color: "#FF55BB"
    },
    {
      name: "White",
      color: "#FFFFFF"
    },
    {
      name: "White",
      color: "#FFFFFF"
    },
    {
      name: "White",
      color: "#FFFFFF"
    },
    {
      name: "White",
      color: "#FFFFFF"
    },
    {
      name: "White",
      color: "#FFFFFF"
    },
  ];
  
  const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
    {
      name: "Default",
      color: "#000",
    },
    {
      name: "Purple",
      color: "#9333EA",
    },
    {
      name: "Red",
      color: "#E00000",
    },
    {
      name: "Yellow",
      color: "#EAB308",
    },
    {
      name: "Blue",
      color: "#2563EB",
    },
    {
      name: "Green",
      color: "#008A00",
    },
    {
      name: "Orange",
      color: "#FFA500",
    },
    {
      name: "Pink",
      color: "#BA4081",
    },
    {
      name: "Gray",
      color: "#A8A29E",
    },
  ];

  export  const ColorSelector: FC<ColorSelectorProps> = ({
    editor,
    isOpen,
    setIsOpen,
  }) => {
    const activeColorItem = TEXT_COLORS.find(({ color }) =>
      editor?.isActive("textStyle", { color })
    );
  

    return (
    <Popover.Root open={isOpen}>
      <div className={styles.colorBody}>
        <Popover.Trigger
          className={styles.headingButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={styles.colorSpan}
            style={{
              color: activeColorItem?.color,  
            }}
          >
            A
          </span>
          <Divider style={{ backgroundColor: activeColorItem?.color}}/>
          {/* <ChevronDown className="novel-h-4 novel-w-4" /> */}
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className={styles.content}
        >
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                setIsOpen(false);
              }}
              className={styles.contentButton}
              type="button"
            >
              {/* <div className={styles.contentButtonName}>
                <div
                  className={styles.contentButtonLetter}
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div> */}
              <div style={{height: '15px', width: '15px', backgroundColor: color}}></div>
              {/* {editor?.isActive("textStyle", { color }) && (
                <Check className={styles.check}/>
              )} */}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
    );
  };

  export  const FillSelector: FC<ColorSelectorProps> = ({
    editor,
    isOpen,
    setIsOpen,
  }) => {
  
    const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
      editor?.isActive("highlight", { color })
    );

    return (
    <Popover.Root open={isOpen}>
      <div className={styles.colorBody}>
        <Popover.Trigger
          className={styles.headingButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* <span
            className={styles.colorSpan}
            style={{
              backgroundColor: activeHighlightItem?.color,
            }}
          > */}
          <button className={styles.colorSpan} style={{
              backgroundColor: activeHighlightItem?.color,
            }}>
            <Image src='/text_fill.svg' alt="text-fill" width="23" height="23" style={{paddingTop: "5px"}} />
          </button>
          {/* </span> */}
          {/* <ChevronDown className="novel-h-4 novel-w-4" /> */}
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className={styles.content}
        >
          {/* <div >
            Background
          </div> */}

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default" && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className={styles.contentButton}
              type="button"
            >
              {/* <div className={styles.contentButtonName}>
                <div
                  className={styles.contentButtonLetter}
                  style={{ backgroundColor: color }}
                >
                  Aa
                </div>
                <span>{name}</span>
              </div> */}
              {/* {editor?.isActive("highlight", { color }) && (
                <Check className={styles.check} />
              )} */}
               <div style={{height: '15px', width: '15px', backgroundColor: color}}></div>
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
    );
  };