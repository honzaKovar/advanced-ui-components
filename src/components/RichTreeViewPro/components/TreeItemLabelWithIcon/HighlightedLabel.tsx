import { memo } from 'react';

import { highlightClassName } from '../../constants';

import { Highlight } from './Highlight';
import { LabelProps } from './types';

const HighlightedLabelComponent = ({ labelText, normalizedHighlightedSegment }: LabelProps) => {
  const escapedSearchValue = normalizedHighlightedSegment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const searchPattern = new RegExp(`(${escapedSearchValue})`, 'gi');

  const segments = labelText.split(searchPattern);

  return segments.map((segment, index) => {
    if (segment.toLowerCase() === normalizedHighlightedSegment) {
      return (
        <Highlight className={highlightClassName} key={index}>
          {segment}
        </Highlight>
      );
    }

    return segment;
  });
};

export const HighlightedLabel = memo(HighlightedLabelComponent);
