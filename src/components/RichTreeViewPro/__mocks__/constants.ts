import { highlightClassName } from '../constants';
import { TreeViewBaseItem } from '../types';

export const mockHighlightClass = `.${highlightClassName}`;
export const mockRootClass = '.MuiTreeItem-root';

export const mockedHighlightSegment = 'item';
export const mockedItemId = 'node-1';
export const mockedLabel = `Item ${mockedItemId}`;
export const mockedTreeItem: TreeViewBaseItem = { id: mockedItemId, label: mockedLabel };
export const mockedItems = [mockedTreeItem];
