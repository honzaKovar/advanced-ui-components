/* eslint-disable sort-keys */
import { StoryObj } from '@storybook/react';

import { PlayoutTrimmerStory, PlayoutTrimmerStoryProps } from './StoryComponents';
import { PlayoutTrimmer } from '../../components';
import { ThemeProvider } from '../../theme';

export default { component: PlayoutTrimmer };

export type PlayoutTrimmerStoryObj = StoryObj<PlayoutTrimmerStoryProps>;
export const Default: PlayoutTrimmerStoryObj = {
  argTypes: {
    disableProgressConstraint: {
      control: {
        type: 'boolean',
      },
    },
    progress: {
      control: { max: 1, min: 0, step: 0.01, type: 'range' },
      if: { arg: 'useUnits', eq: false },
      name: 'progress (normalized)',
    },
    progressUnits: {
      control: { max: 5000, min: 0, step: 1, type: 'range' },
      if: { arg: 'useUnits', eq: true },
      name: 'progress (frames)',
    },
    range: {
      control: {
        type: 'array',
      },
    },
    totalSeconds: {
      control: {
        max: 10000,
        min: 1,
        type: 'range',
      },
    },
    useUnits: {
      control: 'boolean',
      description: 'Switch between normalized (0-1) and unit-based (frames) scaling',
    },
    width: {
      control: {
        max: 1200,
        min: 100,
        type: 'range',
      },
    },
  },
  args: {
    useUnits: true,
    totalSeconds: 137,
    progress: 0.5,
    progressUnits: 2055,
    width: 800,
    range: [0, 4110],
  },
  parameters: {
    controls: {
      include: ['progress', 'progressUnits', 'totalSeconds', 'useUnits', 'width', 'disableProgressConstraint'],
    },
  },
  render: (args) => {
    const { progress, progressUnits, range, totalSeconds, useUnits, width, ...rest } = args as PlayoutTrimmerStoryProps;

    // Default to 0 handles SB dragger edge cases where values might briefly flicker to null
    const effectiveProgress = useUnits ? (progressUnits ?? 0) : (progress ?? 0);

    const fps = 30;
    const totalFrames = totalSeconds * fps;
    const effectiveTotalUnits = useUnits ? totalFrames : undefined;
    const effectiveRange = useUnits ? range : (range.map((value) => value / totalFrames) as [number, number]);

    return (
      <ThemeProvider>
        <PlayoutTrimmerStory
          {...rest}
          totalSeconds={totalSeconds}
          totalUnits={effectiveTotalUnits}
          progress={effectiveProgress}
          useUnits={useUnits}
          range={effectiveRange}
          sx={{
            ...rest['sx'],
            width,
          }}
        />
      </ThemeProvider>
    );
  },
};
