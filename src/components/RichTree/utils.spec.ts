import { mockedItemId, mockedItems, mockedLabel } from './__mocks__';
import { TreeViewBaseItem } from './types';
import { getItemDepthMap } from './utils';

describe('getItemDepthMap', () => {
  it('should return an empty map for an empty items array', () => {
    const result = getItemDepthMap([]);

    expect(result.size).toBe(0);
  });

  it('should calculate depth 0 for flat items using mocks', () => {
    const result = getItemDepthMap(mockedItems);

    expect(result.get(mockedItemId)).toBe(0);
    expect(result.size).toBe(mockedItems.length);
  });

  it('should calculate incremental depths for nested items', () => {
    const childId1 = 'child-1';
    const childId2 = 'child-2';
    const grandchildId = 'grandchild-1';

    const nestedItems: TreeViewBaseItem[] = [
      {
        children: [
          {
            children: [{ id: grandchildId, label: 'Grandchild 1' }],
            id: childId1,
            label: 'Child 1',
          },
          { id: childId2, label: 'Child 2' },
        ],
        id: mockedItemId,
        label: mockedLabel,
      },
    ];

    const result = getItemDepthMap(nestedItems);

    expect(result.get(mockedItemId)).toBe(0);
    expect(result.get(childId1)).toBe(1);
    expect(result.get(grandchildId)).toBe(2);
    expect(result.get(childId2)).toBe(1);
  });

  it('should handle items with empty children arrays', () => {
    const itemsWithEmptyChildren: TreeViewBaseItem[] = [{ ...mockedItems[0], children: [] }];

    const result = getItemDepthMap(itemsWithEmptyChildren);

    expect(result.get(mockedItemId)).toBe(0);
    expect(result.size).toBe(1);
  });

  it('should maintain state across recursive calls and return the same map instance', () => {
    const customMap = new Map<string, number>();

    const result = getItemDepthMap(mockedItems, 0, customMap);

    expect(result).toBe(customMap);
    expect(result.get(mockedItemId)).toBe(0);
  });
});
