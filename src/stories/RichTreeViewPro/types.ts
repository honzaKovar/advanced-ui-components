import {
  TreeItemProps,
  TreeViewBaseItem,
} from "../../components/RichTreeViewPro";
import { RichTreeViewProProps } from '@mui/x-tree-view-pro';
import { StoryObj } from '@storybook/react';

export type RichTreeViewStoryObj = StoryObj<
  RichTreeViewProProps<TreeViewBaseItem, true> &
    Pick<TreeItemProps, 'isDropzoneActive' | 'highlightedLabelSegment' | 'variant'> & {
      containerWidth: number;
    }
>;

export type CustomRichTreeViewNode = TreeViewBaseItem & { mediaType?: 'audio' | 'video' };

export type CustomizedRichTreeViewProProps = Omit<RichTreeViewProProps<CustomRichTreeViewNode, true>, 'resolvers'>;
