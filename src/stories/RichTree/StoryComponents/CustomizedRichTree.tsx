import { RichTree } from '../../../components';
import { CustomizedRichTreeProps, CustomRichTreeNode } from '../types';
import { useRichTreeResolvers } from '../useRichTreeResolvers';

export const CustomizedRichTree = ({ items, ...restArgs }: CustomizedRichTreeProps) => {
  const onRemoteNodeButtonClick = (id: string) => console.log('Clicked on node with id: ', id);

  const resolvers = useRichTreeResolvers(items as CustomRichTreeNode[], onRemoteNodeButtonClick);

  return <RichTree<CustomRichTreeNode, true> items={items} resolvers={resolvers} {...restArgs} />;
};
