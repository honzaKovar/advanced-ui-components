import { getComponentClassName } from '../../utils';

import { TreeViewBaseItem } from './types';

export const getTreeViewComponentClassName = (name: string, suffix: string): string => getComponentClassName('TreeView', name, suffix);

export const getItemDepthMap = <T extends TreeViewBaseItem>(items: T[], depth = 0, map = new Map<string, number>()) => {
  items.forEach(({ children, id }) => {
    map.set(id, depth);

    if (children) getItemDepthMap(children, depth + 1, map);
  });

  return map;
};
