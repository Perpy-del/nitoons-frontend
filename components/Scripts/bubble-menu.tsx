import { Editor } from "@tiptap/core";
import { BubbleMenu, BubbleMenuProps, isNodeSelection } from "@tiptap/react";
import { FC, useState } from "react";
import styles from '@/styles/screenplay.module.css'

export interface BubbleMenuItem {
    name: string;
    isActive: () => boolean;
    command: () => void;
  }

  type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

  export const EditorBubbleMenu = (props: {editor: Editor}) => {
    const items: BubbleMenuItem[] = [
        {
          name: "INT.",
          isActive: () => props.editor.isActive("int"),
          command: () => {
            props.editor?.chain().focus().toggleBold().run()
            // props.editor?.chain().focus().unsetScene().run()
          },
        },
        {
          name: "EXT.",
          isActive: () => props.editor.isActive("scene"),
          command: () => props.editor?.chain().focus().toggleBold().run(),
        },
        {
          name: "INT/EXT.",
          isActive: () => props.editor.isActive("scene"),
          command: () => props.editor?.chain().focus().toggleBold().run(),
        },
        {
          name: "EXT/INT.",
          isActive: () => props.editor.isActive("scene"),
          command: () => props.editor?.chain().focus().toggleBold().run(),
        },
      ];

      const bubbleMenuProps: EditorBubbleMenuProps = {
        ...props,
        shouldShow: ({ state, editor }) => {
          const { selection } = state;
          const { empty } = selection;
    
          if(props.editor?.isActive('scene')) {
            return true;
          }
          return false
        },
        tippyOptions: {
          moveTransition: "transform 0.15s ease-out",
          onHidden: () => {
            setIsNodeSelectorOpen(false);
          },
        },
      };

      const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);

      return (
        <BubbleMenu
            {...bubbleMenuProps}
        >
            <div
            className={styles['scene-body']} 
            >
            {items.map((item, index) => (
                <button
                    key={index}
                    onClick={item.command}
                    type="button"
                    className={styles['scene-button-class']}
                >
                    {item.name}
                </button>
            ))}
            </div>
        </BubbleMenu>
      )
  }