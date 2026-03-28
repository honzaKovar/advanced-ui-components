import { renderHook } from '@testing-library/react';

import { mockedItemId, mockedTreeItem } from '../__mocks__';
import { TreeViewBaseItem } from '../types';

import { useIsItemDisabled } from './useIsItemDisabled';

describe('useIsItemDisabled', () => {
  it('should return true if the resolver returns true', () => {
    const resolvers = { isItemDisabled: () => true };

    const { result } = renderHook(() => useIsItemDisabled(resolvers));

    expect(result.current(mockedTreeItem)).toBe(true);
  });

  it('should prioritize the resolver over the native prop', () => {
    const resolvers = { isItemDisabled: () => true };

    const nativeProp = () => false;

    const { result } = renderHook(() => useIsItemDisabled(resolvers, nativeProp));

    expect(result.current(mockedTreeItem)).toBe(true);
  });

  it('should fallback to the native prop if no resolver is provided', () => {
    const nativeProp = ({ id }: TreeViewBaseItem) => id === mockedItemId;

    const { result } = renderHook(() => useIsItemDisabled(undefined, nativeProp));

    expect(result.current(mockedTreeItem)).toBe(true);
  });

  it('should return false if neither resolver nor native prop is provided', () => {
    const { result } = renderHook(() => useIsItemDisabled());

    expect(result.current(mockedTreeItem)).toBe(false);
  });

  it('should return a memoized function', () => {
    const resolvers = { isItemDisabled: () => true };

    const { rerender, result } = renderHook(({ res }) => useIsItemDisabled(res), { initialProps: { res: resolvers } });

    const firstCallback = result.current;

    rerender({ res: resolvers });

    expect(result.current).toBe(firstCallback);
  });
});
