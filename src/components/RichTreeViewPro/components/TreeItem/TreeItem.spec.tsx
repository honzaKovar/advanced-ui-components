import { render } from "@testing-library/react";

import {
  mockedHighlightSegment,
  mockedItems,
  mockedTreeItem,
  mockHighlightClass,
  mockRootClass,
} from "../../__mocks__";
import { RichTreeViewPro } from "../../RichTreeViewPro";

import { TreeItem } from "./TreeItem";

const mockUseTreeItemModel = jest.fn();

jest.mock("@mui/x-tree-view-pro", () => {
  const originalModule = jest.requireActual("@mui/x-tree-view-pro");

  return {
    ...originalModule,
    useTreeItemModel: (itemId: string) => mockUseTreeItemModel(itemId),
  };
});

const renderWithContext = (
  isDropzoneActive?: boolean,
  highlightedLabelSegment?: string,
) =>
  render(
    <RichTreeViewPro
      items={mockedItems}
      slots={{ item: TreeItem }}
      isDropzoneActive={isDropzoneActive}
      highlightedLabelSegment={highlightedLabelSegment}
    />,
  );

describe("TreeItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Model Loading", () => {
    it("should render valid JSX with MuiTreeItem class when model is found", () => {
      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const { container } = renderWithContext();

      const treeItemElement = container.querySelector(mockRootClass);

      expect(treeItemElement).not.toBeNull();
    });

    it("should return null if tree item model is not found", () => {
      mockUseTreeItemModel.mockReturnValue(null);

      const { container } = renderWithContext();

      const treeItemElement = container.querySelector(mockRootClass);

      expect(treeItemElement).toBeNull();
    });
  });

  describe("Text Highlighting", () => {
    it("should render the highlight component when a match is found", () => {
      mockUseTreeItemModel.mockReturnValue(mockedTreeItem);

      const { container } = renderWithContext(false, mockedHighlightSegment);

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan).not.toBeNull();
      expect(highlightedSpan?.textContent?.toLowerCase()).toBe(
        mockedHighlightSegment,
      );
    });
  });
});
