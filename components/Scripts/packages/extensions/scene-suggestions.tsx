import { Button, Paper, Typography } from '@mui/material';
import { Editor, Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';
import React from 'react';
import tippy from 'tippy.js';

interface CommandProps {
  editor: Editor;
  range: Range;
}

interface CommandItemProps {
  title: string;
}

const Command = Extension.create({
  name: 'scene-suggestions',

  addOptions() {
    return {
      scenelist: {
        char: '/',
        command: (opts: { editor: Editor; range: Range; props: any }) => {
          opts.props.command({ editor: opts.editor, range: opts.range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.scenelist,
      }),
    ];
  },
});

const getSceneSuggestions = () => {
  return [
    {
      title: 'INT',
      id: 'int-scene',
      command: ({ editor }: CommandProps) => {
        editor.chain().focus().insertContent('INT');
      },
    },
    {
      title: 'EXT',
      id: 'ext-scene',
      command: ({ editor }: CommandProps) => {
        editor.chain().focus().insertContent('EXT');
      },
    },
    {
      title: 'INT/EXT',
      id: 'int-ext-scene',
      command: ({ editor }: CommandProps) => {
        editor.chain().focus().insertContent('INT/EXT');
      },
    },
    {
      title: 'EXT/INT',
      id: 'ext-int-scene',
      command: ({ editor }: CommandProps) => {
        editor.chain().focus().insertContent('EXT/INT');
      },
    },
  ];
};

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
};

const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[];
  command: any;
  editor: Editor;
  range: Range;
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectItem = React.useCallback(
    (index: number) => {
      const item = items[index];
      command(item);
    },
    [command, items]
  );

  React.useEffect(() => {
    const listItems = items.map((item) => item.title);
    console.log("LIST OF ITEMS: ", listItems);
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === 'Enter') {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [items, selectItem, selectedIndex, setSelectedIndex]);

  // React.useEffect(() => {
  //   setSelectedIndex(0);
  // }, [items]);

  const commandListContainer = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const container = commandListContainer?.current;

    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return items.length > 0 ? (
    <Paper elevation={0} id="scene-suggestions" ref={commandListContainer} style={{
      backgroundColor: '#FFF',
      boxShadow: '0px 2px 14px 0px rgba(0, 0, 0, 0.16)',
      maxHeight: '400px',
      width: '220px',
    }}>
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <Button
            sx={{
              backgroundColor: '#FFF',
              textTransform: 'capitalize',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '10px',
              gap: '10px',
              '&:hover': {
                backgroundColor: 'rgb(252, 240, 247)',
              },
            }}
            key={index}
            onClick={() => selectItem(index)}
          >
            <Paper
              elevation={0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
            <Typography
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#353538',
              }}
            >
              {item.title}
            </Typography>
            </Paper>
          </Button>
        );
      })}
    </Paper>
  ) : null;
};

const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

const SceneSuggestions = Command.configure({
  suggestion: {
    items: getSceneSuggestions,
    render: renderItems,
  },
});

export default SceneSuggestions;
