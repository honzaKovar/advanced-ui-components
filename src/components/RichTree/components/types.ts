import { UseTreeItemLabelSlotOwnProps } from '@mui/x-tree-view/useTreeItem';

import { TreeItemProps } from '../types';

export type TreeItemLabelWithIconProps = UseTreeItemLabelSlotOwnProps &
  Pick<TreeItemProps, 'EndIconButtonProps' | 'LabelTypographyProps' | 'StartIconProps' | 'highlightedLabelSegment'> & { editable?: boolean };
