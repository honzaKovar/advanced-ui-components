import { CheckboxProps } from "@mui/material/Checkbox";
import { getTreeViewComponentClassName } from "../../utils";

import { checkboxSx } from "./styles";

export const defaultCheckboxProps: CheckboxProps = {
  size: "small",
  sx: checkboxSx,
};

export const dropzoneClassName = getTreeViewComponentClassName(
  "TreeItem",
  "dropzone",
);
