import { ThemeProvider } from "../../theme";
import { RichTreeViewPro } from "../../components/RichTreeViewPro";
import { mockedBaseItems, sharedArgs, sharedArgTypes } from "./constants";
import { CustomizedRichTreeViewPro } from "./StoryComponents";
import { RichTreeViewStoryObj } from "./types";

export const ConfigurableTree: RichTreeViewStoryObj = {
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
      <RichTreeViewPro sx={{ width: 360 }} {...restArgs} />
    </ThemeProvider>
  ),
};

export const AdvancedCustomization: RichTreeViewStoryObj = {
  argTypes: {
    ...sharedArgTypes,
    isDropzoneActive: {
      control: "boolean",
    },
  },
  args: {
    ...sharedArgs,
    isDropzoneActive: false,
    items: mockedBaseItems,
  },
  render: ({ containerWidth, ...restArgs }) => (
    <ThemeProvider>
      <CustomizedRichTreeViewPro sx={{ width: 360 }} {...restArgs} />
    </ThemeProvider>
  ),
};

export default {
  component: RichTreeViewPro,
};
