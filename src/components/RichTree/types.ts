import { TreeItemProps as MuiTreeItemProps } from '@mui/x-tree-view/TreeItem';
import { RichTreeViewProProps, TreeViewDefaultItemModelProperties } from '@mui/x-tree-view-pro';
import { FunctionComponent, MouseEvent, MutableRefObject } from 'react';
import { CheckboxProps, IconButtonProps, SvgIconProps, SxProps, Theme, TypographyProps } from '@mui/material';

export type TreeViewBaseItem<R extends NonNullable<unknown> = TreeViewDefaultItemModelProperties> = R & {
  children?: TreeViewBaseItem<R>[];
};

export type TreeItemVariant = 'standard' | 'outlined';

export type TreeItemPropResolvers<R> = {
  getCheckboxProps?: (item: R) => CheckboxProps | undefined;
  getEndIconButtonProps?: (item: R) => EndIconButtonProps | undefined;
  getLabelTypographyProps?: (item: R) => TypographyProps | undefined;
  getStartIconProps?: (item: R) => StartIconProps | undefined;
  getTreeItemProps?: (item: R) => { hasDropzone?: boolean; sx?: SxProps<Theme> } | undefined;
  isItemDisabled?: (item: R) => boolean;
};

export type TreeItemProps<R extends TreeViewBaseItem = TreeViewBaseItem> = MuiTreeItemProps & {
  EndIconButtonProps?: EndIconButtonProps;
  LabelTypographyProps?: TypographyProps;
  StartIconProps?: StartIconProps;
  highlightedLabelSegment?: string;
  isDropzoneActive?: boolean;
  resolvers?: TreeItemPropResolvers<R>;
  variant?: TreeItemVariant;
};

export type RichTreeWrapperProps<R extends TreeViewBaseItem, Multiple extends boolean | undefined> = Omit<RichTreeViewProProps<R, Multiple>, 'items'> &
  Pick<TreeItemProps, 'isDropzoneActive' | 'highlightedLabelSegment' | 'variant'> & {
    items: readonly R[];
    resolvers?: TreeItemPropResolvers<R>;
    sx?: SxProps<Theme>;
  };

export type BaseProps<R extends TreeViewBaseItem, Multiple extends boolean | undefined> = RichTreeViewProProps<R, Multiple> & {
  ref?: MutableRefObject<HTMLUListElement | null>;
};

type CommonIconProps = {
  Icon: FunctionComponent<SvgIconProps>;
  IconProps?: SvgIconProps;
  show: boolean;
  testId?: string;
};

export type EndIconButtonProps = CommonIconProps & {
  IconButtonProps?: IconButtonProps;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type StartIconProps = CommonIconProps;
