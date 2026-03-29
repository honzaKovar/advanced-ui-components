import { TreeViewBaseItem } from '../../components/RichTree';

import { RichTreeStoryObj } from './types';

export const TreeDepth = {
  Workspace: 0,
  Section: 1,
  Group: 2,
  Folder: 3,
  Item: 4,
} as const;

export const groupColors = ['#EE7D20', '#46B337', '#9EBD2E', '#37B37E', '#AC4EDF', '#46C6C8'];

export const mockedBaseItems: TreeViewBaseItem[] = [
  {
    id: 'workspace-1',
    label: 'Workspace 1',
    children: [
      {
        id: 'section-1',
        label: 'Section A',
        children: [
          {
            id: 'group-1',
            label: 'Group 1',
            children: [
              {
                id: 'folder-1',
                label: 'Folder Alpha',
                children: [
                  { id: 'item-1', label: 'Item 1', mediaType: 'file' },
                  { id: 'item-2', label: 'Item 2', mediaType: 'file' },
                  { id: 'item-3', label: 'Item 3', mediaType: 'file' },
                ],
              },
            ],
          },
          {
            id: 'group-2',
            label: 'Group 2',
            children: [
              {
                id: 'folder-2',
                label: 'Folder Beta',
                children: [
                  {
                    id: 'empty-folder',
                    label: 'Empty Folder',
                  },
                ],
              },
              {
                id: 'folder-3',
                label: 'Folder Gamma',
                children: [{ id: 'item-4', label: 'Item 4', mediaType: 'file' }],
              },
            ],
          },
          { id: 'misc-1', label: 'Misc 1' },
          { id: 'misc-2', label: 'Misc 2' },
          { id: 'misc-3', label: 'Misc 3' },
          { id: 'misc-4', label: 'Misc 4' },
        ],
      },
      {
        id: 'section-2',
        label: 'Section B',
      },
    ],
  },
  {
    id: 'workspace-2',
    label: 'Workspace 2',
    children: [
      {
        id: 'section-3',
        label: 'Section C',
      },
    ],
  },
];

export const sharedArgTypes: RichTreeStoryObj['argTypes'] = {
  checkboxSelection: {
    control: 'boolean',
  },
  isItemEditable: {
    control: 'boolean',
  },
  variant: {
    control: 'radio',
    options: ['standard', 'outlined'],
  },
};

export const sharedArgs: RichTreeStoryObj['args'] = {
  checkboxSelection: false,
  highlightedLabelSegment: '',
  isItemEditable: false,
  variant: 'standard',
};
