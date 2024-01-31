import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import TabNav from "./TabNav";

const meta = {
  title: "TabNav",
  component: TabNav,
  // argTypes: { postCount: { control: { type: "range", min: 1, max: 100 } } },
  args: {
    // params: { page: 1 },
    // postCount: 10,
  },
} satisfies Meta<typeof TabNav>;
export default meta;

type Story = StoryObj<typeof meta>;

// Note that after we set up MSW globally, our orginal story is broken
// export const Home: Story = {};

export const Default: Story = {
  args: {
    activeTabId: "person",
    hub: "boston",
  },
};
