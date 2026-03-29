import { ThemeProvider } from '../../theme';
import { RichTree } from '../../components/RichTree';
import { mockedBaseItems, sharedArgs, sharedArgTypes } from './constants';
import { CustomizedRichTree } from './StoryComponents';
import { RichTreeStoryObj } from './types';

export const ConfigurableTree: RichTreeStoryObj = {
  argTypes: {
    ...sharedArgTypes,
    items: mockedBaseItems,
  },
  args: {
    ...sharedArgs,
    items: mockedBaseItems,
  },
  render: ({ containerWidth, ...restArgs }) => (
    <ThemeProvider>
      <RichTree sx={{ width: 360 }} {...restArgs} />
    </ThemeProvider>
  ),
};

export const AdvancedCustomization: RichTreeStoryObj = {
  argTypes: {
    ...sharedArgTypes,
    isDropzoneActive: {
      control: 'boolean',
    },
  },
  args: {
    ...sharedArgs,
    isDropzoneActive: false,
    items: mockedBaseItems,
  },
  render: ({ containerWidth, ...restArgs }) => (
    <ThemeProvider>
      <CustomizedRichTree sx={{ width: 360 }} {...restArgs} />
    </ThemeProvider>
  ),
};

export default {
  component: RichTree,
};
