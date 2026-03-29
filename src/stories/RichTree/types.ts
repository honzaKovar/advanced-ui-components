import { RichTreeViewProProps } from '@mui/x-tree-view-pro';
import { StoryObj } from '@storybook/react';

import { TreeItemProps, TreeViewBaseItem } from '../../components/RichTree';

export type RichTreeStoryObj = StoryObj<
  RichTreeViewProProps<TreeViewBaseItem, true> &
    Pick<TreeItemProps, 'isDropzoneActive' | 'highlightedLabelSegment' | 'variant'> & {
      containerWidth: number;
    }
>;

export type CustomRichTreeNode = TreeViewBaseItem & { mediaType?: 'file' };

export type CustomizedRichTreeProps = Omit<RichTreeViewProProps<CustomRichTreeNode, true>, 'resolvers'>;
