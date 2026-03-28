import { DependencyList, useMemo, useRef } from 'react';

import { TreeItemPropResolvers, TreeViewBaseItem } from '../types';
import { getItemDepthMap } from '../utils';

export const useTreeItemResolvers = <R extends TreeViewBaseItem>(
  items: R[],
  factory: (helpers: { depthMap: Map<string, number> }) => TreeItemPropResolvers<R>,
  deps: DependencyList = []
) => {
  const depthMap = useMemo(() => getItemDepthMap(items), [items]);

  const factoryRef = useRef(factory);

  factoryRef.current = factory;

  return useMemo(
    () => factoryRef.current({ depthMap }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [depthMap, ...deps]
  );
};
