import { Checkbox, SlotComponentProps } from "@mui/material";
import { TreeItem as MuiTreeItem } from "@mui/x-tree-view/TreeItem";
import { useTreeItemModel } from "@mui/x-tree-view-pro";
import { ElementType, forwardRef, Ref } from "react";

import { TreeItemProps, TreeViewBaseItem } from "../../types";
import { TreeItemLabelWithIcon } from "../TreeItemLabelWithIcon";
import { TreeItemLabelWithIconProps } from "../types";

import { defaultCheckboxProps, dropzoneClassName } from "./constants";
import { getDefaultTreeItemSx } from "./styles";
import { mergeSx } from "../../../../utils";

/**
 * A customized TreeItem component that integrates with the RichTreeViewPro wrapper.
 * It automatically consumes the tree item model to render checkboxes, icons,
 * and handles search highlighting and dropzone visual states based on the global props provided to RichTreeViewPro.
 */
const TreeItemComponent = <R extends TreeViewBaseItem>(
  {
    highlightedLabelSegment,
    isDropzoneActive,
    itemId,
    resolvers,
    slotProps,
    slots,
    variant = "standard",
    ...restProps
  }: TreeItemProps<R>,
  ref: Ref<HTMLLIElement>,
) => {
  const treeItemModel = useTreeItemModel<R>(itemId);

  if (!treeItemModel) return null;

  const resolvedProps = resolvers
    ? {
        CheckboxProps: resolvers.getCheckboxProps?.(treeItemModel),
        EndIconButtonProps: resolvers.getEndIconButtonProps?.(treeItemModel),
        LabelTypographyProps:
          resolvers.getLabelTypographyProps?.(treeItemModel),
        StartIconProps: resolvers.getStartIconProps?.(treeItemModel),
        disabled: resolvers.isItemDisabled?.(treeItemModel),
        treeItemProps: resolvers.getTreeItemProps?.(treeItemModel),
      }
    : {};

  const {
    CheckboxProps = defaultCheckboxProps,
    disabled,
    EndIconButtonProps,
    LabelTypographyProps,
    StartIconProps,
    treeItemProps: resolvedTreeItemProps,
  } = resolvedProps;

  const labelSlotProps: Partial<TreeItemLabelWithIconProps> | undefined = {
    ...(slotProps?.label as Partial<TreeItemLabelWithIconProps> | undefined),
    EndIconButtonProps,
    LabelTypographyProps,
    StartIconProps,
    // Prevents console error
    // Does not affect label editing, isItemEditable prop on RichTreeViewPro serves for that
    editable: undefined,
    highlightedLabelSegment,
  };

  const checkboxSlotProps:
    | SlotComponentProps<ElementType<typeof Checkbox>, object, object>
    | undefined = {
    ...slotProps?.checkbox,
    ...CheckboxProps,
  };

  const { hasDropzone, sx } = resolvedTreeItemProps ?? {};

  const showDropzone = Boolean(hasDropzone && isDropzoneActive);

  return (
    <MuiTreeItem
      {...restProps}
      ref={ref}
      disabled={disabled}
      className={showDropzone ? dropzoneClassName : undefined}
      itemId={itemId}
      slots={{ label: TreeItemLabelWithIcon, ...slots }}
      slotProps={{
        ...slotProps,
        checkbox: checkboxSlotProps,
        label: labelSlotProps,
      }}
      sx={mergeSx(getDefaultTreeItemSx(variant, showDropzone), sx)}
    />
  );
};

const Forwarded = forwardRef(TreeItemComponent);

export const TreeItem = Forwarded as typeof Forwarded & {
  <R extends TreeViewBaseItem>(
    props: TreeItemProps<R> & { ref?: Ref<HTMLLIElement> },
  ): ReturnType<typeof TreeItemComponent>;
};

TreeItem.displayName = "TreeItem";
