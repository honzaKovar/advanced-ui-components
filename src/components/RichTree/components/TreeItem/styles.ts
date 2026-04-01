import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { alpha, SxProps, Theme } from '@mui/material';

import { mergeSx } from '../../../../utils';
import { TreeItemVariant } from '../../types';

const iconSizePx = 16;
const iconContainerSizePx = 24;
const defaultTreeItemHeightPx = 32;
const treeItemMarginBottomUnits = 0.5;
const outlinePaddingUnits = 3;
const marginOffsetPx = 12;

export const commonTreeItemSx: SxProps<Theme> = ({ palette }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& > svg': {
      height: iconSizePx,
      width: iconSizePx,
    },
    alignItems: 'center',
    height: iconContainerSizePx,
    width: iconContainerSizePx,
  },
  '&:not(.Mui-expanded):not(:last-child)': {
    mb: treeItemMarginBottomUnits,
  },
  '&[aria-checked="true"]': {
    backgroundColor: alpha(palette.primary.main, 0.08),
    borderRadius: ({ shape }) => `${shape.borderRadius}px`,
  },
  [`& .${treeItemClasses.content}`]: {
    '&.Mui-expanded:not(:last-child)': {
      mb: treeItemMarginBottomUnits,
    },
    '&.Mui-selected': {
      backgroundColor: alpha(palette.primary.main, 0.16),
    },
    '&:not(.Mui-disabled)': {
      '&.Mui-selected:hover': {
        backgroundColor: alpha(palette.primary.main, 0.24),
      },
      '&:hover:not(.Mui-selected)': {
        backgroundColor: alpha(palette.info.main, 0.04),
      },
    },
    gap: 1.5,
    height: defaultTreeItemHeightPx,
    width: '100%',
  },
  color: palette.text.primary,
  width: '100%',
});

export const outlinedTreeItemSx: SxProps<Theme> = ({ palette }) => ({
  '&[aria-checked="true"]': {
    backgroundColor: 'transparent',
  },
  '--TreeView-indentation': '24px',
  [`& .${treeItemClasses.content}`]: {
    '& ~ ul': {
      '& > div': {
        borderLeft: `1px solid ${palette.divider}`,
        marginLeft: `calc(var(--TreeView-itemChildrenIndentation) + ${marginOffsetPx}px)`,
        width: `calc(100% - var(--TreeView-itemChildrenIndentation) - ${marginOffsetPx}px)`,
      },
    },
    '&.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: 'transparent',
    },
    '&:not(.Mui-disabled)': {
      '&.Mui-selected:hover': {
        backgroundColor: alpha(palette.info.main, 0.04),
      },
    },
    pl: outlinePaddingUnits,
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    width: 'var(--TreeView-indentation)',
  },
  pl: outlinePaddingUnits,
});

const getDropzoneGradient = (palette: Theme['palette']) => {
  const color = palette.primary;
  const dash = 4;
  const gap = 4;
  const angles = [90, 90, 0, 0];

  return angles.map((angle) => `repeating-linear-gradient(${angle}deg, ${color} 0 ${dash}px, transparent ${dash}px ${dash + gap}px)`).join(', ');
};

export const dropzoneSx: SxProps<Theme> = ({ palette, shape }) => ({
  [`& > .${treeItemClasses.content}`]: {
    '&.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: alpha(palette.primary.main, 0.6),
    },
    '&::before': {
      backgroundImage: getDropzoneGradient(palette),
      backgroundPosition: 'top left, bottom left, top left, top right',
      backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
      backgroundSize: '100% 1px, 100% 1px, 1px 100%, 1px 100%',
      borderRadius: 'inherit',
      content: '""',
      inset: 0,
      pointerEvents: 'none',
      position: 'absolute',
    },
    '&:not(.Mui-disabled)': {
      '&:hover:not(.Mui-selected.Mui-focused), &.Mui-selected:hover, &.Mui-focused:hover': {
        backgroundColor: palette.primary.main,
      },
    },
    backgroundColor: alpha(palette.primary.main, 0.6),
    borderRadius: `${shape.borderRadius}px`,
    position: 'relative',
  },
});

export const getDefaultTreeItemSx = (variant: TreeItemVariant, showDropzone?: boolean): SxProps<Theme> =>
  mergeSx(commonTreeItemSx, variant === 'outlined' ? outlinedTreeItemSx : {}, showDropzone ? dropzoneSx : {});

export const checkboxSx: SxProps<Theme> = {
  p: 2,
};
