import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import TabNav from "./TabNav";

const meta = {
  title: "TabNav",
  component: TabNav,
  // argTypes: { postCount: { control: { type: "range", min: 1, max: 100 } } },
  args: {
    // params: { tags: ["burger"] },
    // postCount: 10,
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    nextjs: {
      pathname: "/boston/place",
      segments: [["hub", "boston"]],
    },
  },
} satisfies Meta<typeof TabNav>;
export default meta;

type Story = StoryObj<typeof meta>;

// Note that after we set up MSW globally, our orginal story is broken
// export const Home: Story = {};

export const Default: Story = {
  args: {},
};
