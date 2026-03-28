import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import FolderIcon from "@mui/icons-material/Folder";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

import { customizedAssetIconSx, customizedRemoteNodeSx } from "./styles";
import { CustomRichTreeViewNode } from "./types";
import { getRandomColor } from "./utils";
import { useTreeItemResolvers } from "../../components/RichTreeViewPro";
import { TreeDepth } from "./constants";

const { Folder, Group, Item, Section, Workspace } = TreeDepth;

export const useRichTreeViewProResolvers = (
  items: CustomRichTreeViewNode[],
  onAssetClick: (id: string) => void,
) =>
  useTreeItemResolvers(
    items,
    ({ depthMap }) => ({
      getEndIconButtonProps: ({ id }) => {
        if (depthMap.get(id) !== Folder) return;

        return {
          Icon: EditTwoToneIcon,
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();

            onAssetClick(id);
          },
          show: true,
        };
      },

      getLabelTypographyProps: ({ id }) => {
        const depth = depthMap.get(id);

        if (depth !== Workspace) return;

        return {
          color: "textSecondary",
          variant: "subtitle1",
        };
      },

      getStartIconProps: ({ id, mediaType }) => {
        const depth = depthMap.get(id);

        if (depth === Workspace) {
          return {
            Icon: WorkspacesIcon,
            IconProps: { sx: { color: getRandomColor() } },
            show: true,
          };
        }

        if (depth === Group) {
          return {
            Icon: FolderIcon,
            IconProps: { sx: { color: getRandomColor() } },
            show: true,
          };
        }

        if (depth === Folder) {
          return { Icon: FolderIcon, show: true };
        }

        if (depth === Item && mediaType) {
          return {
            Icon: LabelImportantIcon,
            IconProps: { sx: customizedAssetIconSx },
            show: true,
          };
        }

        return;
      },

      getTreeItemProps: ({ id }) => {
        if (depthMap.get(id) !== Folder) return;

        return {
          hasDropzone: true,
          sx: customizedRemoteNodeSx,
        };
      },

      isItemDisabled: ({ children, id, mediaType }) => {
        const depth = depthMap.get(id);

        const isFinalNodePopulated = depth === Item && mediaType;

        if (isFinalNodePopulated) return false;

        const isChildlessNonRemoteNode = !children && depth !== Folder;

        return isChildlessNonRemoteNode;
      },
    }),
    [onAssetClick],
  );
