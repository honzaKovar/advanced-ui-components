import { RichTreeViewPro } from "../../../components";
import {
  CustomizedRichTreeViewProProps,
  CustomRichTreeViewNode,
} from "../types";
import { useRichTreeViewProResolvers } from "../useRichTreeViewProResolvers";

export const CustomizedRichTreeViewPro = ({
  items,
  ...restArgs
}: CustomizedRichTreeViewProProps) => {
  const onRemoteNodeButtonClick = (id: string) =>
    console.log("Clicked on node with id: ", id);

  const resolvers = useRichTreeViewProResolvers(
    items as CustomRichTreeViewNode[],
    onRemoteNodeButtonClick,
  );

  return (
    <RichTreeViewPro<CustomRichTreeViewNode, true>
      items={items}
      resolvers={resolvers}
      {...restArgs}
    />
  );
};
