import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  RichTreeViewPro as MuiRichTreeViewPro,
  RichTreeViewProProps,
} from "@mui/x-tree-view-pro";
import { ForwardedRef, forwardRef } from "react";

import { TreeItem } from "./components";
import { useIsItemDisabled } from "./hooks";
import { defaultRichTreeViewProSx } from "./styles";
import {
  BaseProps,
  RichTreeViewProWrapperProps,
  TreeItemProps,
  TreeViewBaseItem,
} from "./types";
import { mergeSx } from "../../utils";

const RichTreeViewProComponent = <
  R extends TreeViewBaseItem,
  Multiple extends boolean | undefined,
>(
  {
    highlightedLabelSegment,
    isDropzoneActive,
    isItemDisabled: isItemDisabledNativeProp,
    resolvers,
    slotProps,
    slots,
    sx,
    variant,
    ...restProps
  }: RichTreeViewProWrapperProps<R, Multiple>,
  ref: ForwardedRef<HTMLUListElement>,
) => {
  const mergedSlots: RichTreeViewProProps<R, Multiple>["slots"] = {
    collapseIcon: ExpandLessIcon,
    expandIcon: ExpandMoreIcon,
    item: TreeItem,
    ...slots,
  };

  const { item: itemSlotProps, ...restSlotProps } = slotProps ?? {};

  const mergedSlotProps: RichTreeViewProProps<R, Multiple>["slotProps"] = {
    item: {
      highlightedLabelSegment,
      isDropzoneActive,
      resolvers,
      variant,
      ...itemSlotProps,
    } as TreeItemProps<R>,
    ...restSlotProps,
  };

  const handleIsItemDisabled = useIsItemDisabled(
    resolvers,
    isItemDisabledNativeProp,
  );

  return (
    <MuiRichTreeViewPro
      ref={ref}
      isItemDisabled={handleIsItemDisabled}
      slots={mergedSlots}
      slotProps={mergedSlotProps}
      sx={mergeSx(defaultRichTreeViewProSx, sx)}
      {...restProps}
    />
  );
};

/**
 * @param highlightedLabelSegment - The text string to be highlighted within all tree item labels.
 * @param isDropzoneActive - Set to `true` when a drag operation is in progress. This enables visual indicators for all items where the underlying node data has `hasDropzone: true`.
 * @param variant - The visual style of the tree items (`standard` | `outlined`). Default variant is `standard`.
 */
export const RichTreeViewPro = forwardRef(RichTreeViewProComponent) as <
  R extends TreeViewBaseItem,
  Multiple extends boolean | undefined = undefined,
>(
  props: RichTreeViewProWrapperProps<R, Multiple> & BaseProps<R, Multiple>,
) => ReturnType<typeof RichTreeViewProComponent>;
