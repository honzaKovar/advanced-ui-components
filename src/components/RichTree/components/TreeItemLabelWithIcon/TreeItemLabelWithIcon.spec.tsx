import { hexToRgb, ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';

import { theme } from '../../../../theme';
import { mockHighlightClass } from '../../__mocks__';

import { TreeItemLabelWithIcon } from './TreeItemLabelWithIcon';

const mockIconTestId = 'mock-icon';
const defaultTextLabel = 'Searchable Item';

const MockIcon = (props = {}) => <svg {...props} />;

const defaultIconProps = {
  Icon: MockIcon,
  testId: mockIconTestId,
};

const defaultProps = {
  children: defaultTextLabel,
  onDoubleClick: jest.fn(),
};

const renderComponent = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <TreeItemLabelWithIcon {...defaultProps} {...props} />
    </ThemeProvider>,
  );

describe('TreeItemLabelWithIcon', () => {
  describe('Icon Rendering', () => {
    it('should render the StartIcon when show is set to true', () => {
      renderComponent({
        StartIconProps: { ...defaultIconProps, show: true },
      });

      const icon = screen.getByTestId(mockIconTestId);

      expect(icon).not.toBeNull();
    });

    it('should not render the StartIcon when show is set to false', () => {
      renderComponent({
        StartIconProps: { ...defaultIconProps, show: false },
      });

      expect(screen.queryByTestId(mockIconTestId)).toBeNull();
    });

    it('should render the EndIconButton when show is set to true', () => {
      renderComponent({
        EndIconButtonProps: { ...defaultIconProps, show: true },
      });

      expect(screen.getByRole('button')).not.toBeNull();
      expect(screen.getByTestId(mockIconTestId)).not.toBeNull();
    });

    it('should not render the EndIconButton when show is set to false', () => {
      renderComponent({
        EndIconButtonProps: { ...defaultIconProps, show: false },
      });

      expect(screen.queryByTestId(mockIconTestId)).toBeNull();
    });
  });

  describe('Event Handling', () => {
    it('should call onClick and stop propagation when EndIconButton is clicked', () => {
      const onClickMock = jest.fn();

      renderComponent({
        EndIconButtonProps: {
          Icon: MockIcon,
          onClick: onClickMock,
          show: true,
        },
      });

      const button = screen.getByRole('button');

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      const stopPropagationSpy = jest.spyOn(clickEvent, 'stopPropagation');

      fireEvent(button, clickEvent);

      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  describe('Text Highlighting', () => {
    it('should render valid JSX with highlighted span when segment matches', () => {
      const highlightedLabelSegment = 'searchable';

      const { container } = renderComponent({
        children: defaultTextLabel,
        highlightedLabelSegment,
      });

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan).not.toBeNull();

      if (highlightedSpan) {
        const style = window.getComputedStyle(highlightedSpan);

        const expectedRgb = hexToRgb(theme.palette.primary.main);

        expect(style.backgroundColor).toBe(expectedRgb);
        expect(style.display).toBe('inline');

        expect(highlightedSpan.textContent?.toLowerCase()).toBe(highlightedLabelSegment);
      }
    });

    it('should render raw text (no highlighted spans) when no match is found', () => {
      const highlightedLabelSegment = 'non-existent';

      const { container } = renderComponent({
        children: defaultTextLabel,
        highlightedLabelSegment,
      });

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan).toBeNull();

      expect(container.textContent).toContain(defaultTextLabel);
    });

    it('should return children as-is if children is not a string', () => {
      const complexChildTestId = 'complex';
      const complexChild = <div data-testid={complexChildTestId}>Complex</div>;
      const highlightedLabelSegment = 'test';

      const { queryByTestId } = renderComponent({
        children: complexChild,
        highlightedLabelSegment,
      });

      expect(queryByTestId(complexChildTestId)).not.toBeNull();
    });

    it('should not render a highlighted span when the segment is only whitespace', () => {
      const highlightedLabelSegment = ' ';

      const { container } = renderComponent({
        children: defaultTextLabel,
        highlightedLabelSegment,
      });

      const highlightedSpan = container.querySelector(mockHighlightClass);

      expect(highlightedSpan).toBeNull();

      expect(container.textContent).toContain(defaultTextLabel);
    });

    it('should correctly highlight trailing whitespace when accompanied by text', () => {
      const highlightedLabelSegment = 'searchable ';
      const expectedResult = 'Searchable ';

      const { container } = renderComponent({
        children: defaultTextLabel,
        highlightedLabelSegment,
      });

      const highlightedSpan = container.querySelector(mockHighlightClass) as HTMLElement;

      expect(highlightedSpan).not.toBeNull();
      expect(highlightedSpan.textContent).toBe(expectedResult);

      const style = window.getComputedStyle(highlightedSpan);

      expect(style.whiteSpace).toBe('pre-wrap');
    });
  });

  describe('Prop Forwarding', () => {
    it('should apply custom Typography variant from LabelTypographyProps', () => {
      const { container } = renderComponent({
        LabelTypographyProps: { variant: 'h6' },
      });

      const typography = container.querySelector('.MuiTypography-h6');

      expect(typography).not.toBeNull();
    });
  });
});
