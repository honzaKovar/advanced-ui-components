import { render } from '@testing-library/react';

import { RichTree } from '../../';
import { mockedItemId, mockedItems, mockedLabel, mockedTreeItem, mockRootClass } from '../../__mocks__';
import { TreeItemPropResolvers, TreeViewBaseItem } from '../../types';

import { dropzoneClassName } from './constants';
import { TreeItem } from './TreeItem';
import { SvgIconProps, ThemeProvider } from '@mui/material';
import { theme } from '../../../../theme';

const mockUseTreeItemModel = jest.fn();

jest.mock('@mui/x-tree-view-pro', () => {
  const originalModule = jest.requireActual('@mui/x-tree-view-pro');

  return {
    ...originalModule,
    useTreeItemModel: (itemId: string) => mockUseTreeItemModel(itemId),
  };
});

describe('TreeItem Prop Resolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Dropzone State', () => {
    it('should apply the dropzone class name when isDropzoneActive and hasDropzone are both true', () => {
      const isDropzoneActive = true;

      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const resolvers: TreeItemPropResolvers<typeof mockedTreeItem> = {
        getTreeItemProps: () => ({
          hasDropzone: true,
        }),
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} isDropzoneActive={isDropzoneActive} resolvers={resolvers} />
        </ThemeProvider>,
      );

      const elementWithDropzone = container.querySelector(`.${dropzoneClassName}`);

      expect(elementWithDropzone).not.toBeNull();
    });

    it('should NOT apply the dropzone class name when isDropzoneActive is false and hasDropzone is true', () => {
      const isDropzoneActive = false;

      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const resolvers: TreeItemPropResolvers<typeof mockedTreeItem> = {
        getTreeItemProps: () => ({
          hasDropzone: true,
        }),
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} isDropzoneActive={isDropzoneActive} resolvers={resolvers} />
        </ThemeProvider>,
      );

      const treeItemElement = container.querySelector(mockRootClass);

      expect(treeItemElement?.classList.toString()).not.toContain(dropzoneClassName);
    });

    it('should NOT apply the dropzone class name when isDropzoneActive is true and hasDropzone is false', () => {
      const isDropzoneActive = true;

      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const resolvers: TreeItemPropResolvers<typeof mockedTreeItem> = {
        getTreeItemProps: () => ({
          hasDropzone: false,
        }),
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} isDropzoneActive={isDropzoneActive} resolvers={resolvers} />
        </ThemeProvider>,
      );

      const treeItemElement = container.querySelector(mockRootClass);

      expect(treeItemElement?.classList.toString()).not.toContain(dropzoneClassName);
    });
  });

  describe('Disabled State', () => {
    it('should be enabled when no resolvers are provided', () => {
      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const { container } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} />
        </ThemeProvider>,
      );

      const treeItemContent = container.querySelector('.MuiTreeItem-content');

      expect(treeItemContent?.classList.contains('Mui-disabled')).toBe(false);
    });

    it('should apply disabled state when isItemDisabled resolver returns true', () => {
      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const resolvers: TreeItemPropResolvers<typeof mockedTreeItem> = {
        isItemDisabled: ({ id }: TreeViewBaseItem) => id === mockedItemId,
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} resolvers={resolvers} />
        </ThemeProvider>,
      );

      const treeItemElement = container.querySelector(mockRootClass);
      const treeItemContent = container.querySelector('.MuiTreeItem-content');

      // Verifying disabled accessibility on the <li>
      expect(treeItemElement?.getAttribute('aria-disabled')).toBe('true');

      // Verifying disabled visual state on the inner <div>
      expect(treeItemContent?.classList.contains('Mui-disabled')).toBe(true);
    });

    it('should NOT apply disabled state when isItemDisabled resolver returns false', () => {
      const invalidId = 'some-other-id';

      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const resolvers: TreeItemPropResolvers<typeof mockedTreeItem> = {
        isItemDisabled: ({ id }: TreeViewBaseItem) => id === invalidId,
      };

      const { container } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} resolvers={resolvers} />
        </ThemeProvider>,
      );

      const treeItemElement = container.querySelector(mockRootClass);
      const treeItemContent = container.querySelector('.MuiTreeItem-content');

      // Verifying enabled accessibility on the <li>
      expect(treeItemElement?.getAttribute('aria-disabled')).not.toBe('true');

      // Verifying enabled visual state on the inner <div>
      expect(treeItemContent?.classList.contains('Mui-disabled')).toBe(false);
    });
  });

  describe('Icon/IconButton resolvers', () => {
    it('should render StartIcon and EndIconButton and trigger the EndIconButton onClick handler', () => {
      const startIconTestId = 'custom-start-icon';
      const endIconButtonTestId = 'custom-end-icon-button';
      const handleOnClick = jest.fn();

      const MockIcon = (props: SvgIconProps) => <svg {...props} />;

      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const resolvers: TreeItemPropResolvers<typeof mockedTreeItem> = {
        getEndIconButtonProps: ({ id }) => ({
          Icon: MockIcon,
          onClick: handleOnClick,
          show: id === mockedItemId,
          testId: endIconButtonTestId,
        }),
        getStartIconProps: () => ({
          Icon: MockIcon,
          show: true,
          testId: startIconTestId,
        }),
      };

      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} resolvers={resolvers} />
        </ThemeProvider>,
      );

      expect(getByTestId(startIconTestId)).toBeTruthy();

      const endButton = getByTestId(endIconButtonTestId);

      expect(endButton).toBeTruthy();

      endButton.click();
      expect(handleOnClick).toHaveBeenCalledTimes(1);
    });

    it('should apply typography props to the label', () => {
      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const resolvers: TreeItemPropResolvers<typeof mockedTreeItem> = {
        getLabelTypographyProps: () => ({
          variant: 'h6',
        }),
      };

      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <RichTree items={mockedItems} slots={{ item: TreeItem }} resolvers={resolvers} />
        </ThemeProvider>,
      );

      const label = getByText(mockedLabel);

      expect(label.classList.toString()).toContain('MuiTypography-h6');
    });
  });
});
