import { hexToRgb } from "@mui/material/styles";
import { render } from "@testing-library/react";

import { mockHighlightClass } from "../../__mocks__";
import { HighlightedLabel } from "./HighlightedLabel";
import { theme, ThemeProvider } from "../../../../theme";


const renderComponent = (labelText: string, highlightedSegment: string) =>
  render(
    <ThemeProvider>
      <HighlightedLabel
        labelText={labelText}
        normalizedHighlightedSegment={highlightedSegment.toLowerCase()}
      />
    </ThemeProvider>,
  );

describe("HighlightedLabel", () => {
  describe("Rendering Logic", () => {
    it("should render valid JSX with Highlight span when a match is found", () => {
      const labelText = "Searchable Item";
      const highlightedSegment = "searchable";

      const { container } = renderComponent(labelText, highlightedSegment);

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan).not.toBeNull();

      if (highlightedSpan) {
        const style = window.getComputedStyle(highlightedSpan);
        const expectedRgb = hexToRgb(theme.palette.primary.main);

        expect(style.backgroundColor).toBe(expectedRgb);
        expect(style.display).toBe("inline");
      }
    });

    it("should correctly highlight multiple occurrences of the same segment", () => {
      const labelText = "banana";
      const highlightedSegment = "a";

      const { container } = renderComponent(labelText, highlightedSegment);

      const highlightedSpans = Array.from(
        container.querySelectorAll(mockHighlightClass),
      );

      expect(highlightedSpans).toHaveLength(3);
      highlightedSpans.forEach((highlightedSpan) => {
        expect(highlightedSpan.textContent).toBe(highlightedSegment);
      });
    });

    it("should preserve and highlight trailing whitespace in the segment", () => {
      const labelText = "Bank 1";
      const highlightedSegmentWithTrailingSpace = "bank ";
      const expectedResult = "Bank ";

      const { container } = renderComponent(
        labelText,
        highlightedSegmentWithTrailingSpace,
      );

      const highlightedSpan = container.querySelector(
        mockHighlightClass,
      ) as HTMLElement;

      expect(highlightedSpan).not.toBeNull();
      expect(container.textContent).toBe(labelText);
      expect(highlightedSpan.textContent).toBe(expectedResult);

      const style = window.getComputedStyle(highlightedSpan);

      expect(style.whiteSpace).toBe("pre-wrap");
    });

    it("should render raw text when no match is found", () => {
      const labelText = "Plain Text";
      const highlightedSegment = "missing";

      const { container } = renderComponent(labelText, highlightedSegment);

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan).toBeNull();
      expect(container.textContent).toBe(labelText);
    });
  });

  describe("Regex and Casing", () => {
    it("should be case-insensitive but preserve original text casing in the DOM", () => {
      const labelText = "MUI Component";
      const highlightedSegment = "mui";

      const { container } = renderComponent(labelText, highlightedSegment);

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan?.textContent).toBe("MUI");
    });

    it("should safely handle special regex characters in the search segment", () => {
      const labelText = "Price: $10.00";
      const highlightedSegment = "$10.00";

      const { container } = renderComponent(labelText, highlightedSegment);

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan).not.toBeNull();
      expect(highlightedSpan?.textContent).toBe(highlightedSegment);
    });
  });
});
