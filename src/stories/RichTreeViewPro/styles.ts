import { SxProps, Theme } from '@mui/material';
import { treeItemClasses } from '@mui/x-tree-view-pro';

export const customizedRemoteNodeSx: SxProps<Theme> = {
  [`& > .${treeItemClasses.content}`]: {
    height: 40,
  },
};

export const customizedAssetIconSx: SxProps<Theme> = {
  color: 'purple', // TODO: change color
};
