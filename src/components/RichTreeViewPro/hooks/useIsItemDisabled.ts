import { useCallback } from 'react';

import { TreeItemPropResolvers, TreeViewBaseItem } from '../types';

export const useIsItemDisabled = <R extends TreeViewBaseItem>(resolvers?: TreeItemPropResolvers<R>, isItemDisabledNativeProp?: (item: R) => boolean) =>
  useCallback(
    (item: R) => {
      if (resolvers?.isItemDisabled) {
        return resolvers.isItemDisabled(item);
      }

      if (isItemDisabledNativeProp) {
        return isItemDisabledNativeProp(item);
      }

      return false;
    },
    [resolvers, isItemDisabledNativeProp]
  );
