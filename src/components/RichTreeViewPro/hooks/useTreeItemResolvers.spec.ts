import { renderHook } from '@testing-library/react';

import { mockedItems, mockedTreeItem } from '../__mocks__';
import { TreeItemPropResolvers, TreeViewBaseItem } from '../types';
import { getItemDepthMap } from '../utils';

import { useTreeItemResolvers } from './';

jest.mock('../utils', () => {
  const actualUtils = jest.requireActual('../utils');

  return {
    ...actualUtils,
    getItemDepthMap: jest.fn((items: TreeViewBaseItem[]) => {
      const map = new Map<string, number>();

      const calculate = (nodes: TreeViewBaseItem[], depth: number) => {
        nodes.forEach(({ children, id }) => {
          map.set(id, depth);

          if (children) {
            calculate(children, depth + 1);
          }
        });
      };

      calculate(items, 0);

      return map;
    }),
  };
});

const mockFactory = ({ depthMap }: { depthMap: Map<string, number> }): TreeItemPropResolvers<typeof mockedTreeItem> => ({
  isItemDisabled: ({ id }: typeof mockedTreeItem) => depthMap.get(id) === 0,
});

describe('useTreeItemResolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a depth map and pass it to the factory', () => {
    const { result } = renderHook(() => useTreeItemResolvers(mockedItems, mockFactory));

    expect(getItemDepthMap).toHaveBeenCalledWith(mockedItems);
    expect(result.current.isItemDisabled?.(mockedTreeItem)).toBe(true);
  });

  it('should memoize the resolvers based on items change', () => {
    const { rerender, result } = renderHook(({ itemsList }) => useTreeItemResolvers(itemsList, mockFactory), {
      initialProps: { itemsList: mockedItems },
    });

    const firstResult = result.current;

    rerender({ itemsList: mockedItems });

    expect(result.current).toBe(firstResult);

    const newItems = [{ id: '2', label: 'Item 2' }];

    rerender({ itemsList: newItems });

    expect(result.current).not.toBe(firstResult);
    expect(getItemDepthMap).toHaveBeenCalledTimes(2);
  });

  it('should re-run the factory when custom deps change', () => {
    const { rerender, result } = renderHook(({ dependency }) => useTreeItemResolvers(mockedItems, () => ({}), [dependency]), {
      initialProps: { dependency: 1 },
    });

    const firstResult = result.current;

    // Rerender with SAME dependency -> Reference should stay the same
    rerender({ dependency: 1 });
    expect(result.current).toBe(firstResult);

    // Rerender with DIFFERENT dependency -> Reference should change
    rerender({ dependency: 2 });
    expect(result.current).not.toBe(firstResult);
  });

  it('should use the latest factory even if it is not in deps (via factoryRef)', () => {
    const { rerender, result } = renderHook(({ dependency, factory }) => useTreeItemResolvers(mockedItems, factory, [dependency]), {
      initialProps: {
        dependency: 1,
        factory: () => ({ isItemDisabled: () => true }),
      },
    });

    expect(result.current.isItemDisabled?.(mockedTreeItem)).toBe(true);

    // Change factory but NOT the dependency
    rerender({ dependency: 1, factory: () => ({ isItemDisabled: () => false }) });

    // Returns true (first factory) because dependency didn't change
    expect(result.current.isItemDisabled?.(mockedTreeItem)).toBe(true);

    // Change dependency -> should now use the LATEST factory (returning false)
    rerender({ dependency: 2, factory: () => ({ isItemDisabled: () => false }) });
    expect(result.current.isItemDisabled?.(mockedTreeItem)).toBe(false);
  });
});
