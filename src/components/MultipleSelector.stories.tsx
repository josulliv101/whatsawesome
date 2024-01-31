import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import MultipleSelector from "./MultipleSelector";
// import ErrorPage from '../../error'
// import { range, createPost, reset } from '../../../lib/data.mock'

const meta = {
  title: "MultipleSelector",
  component: MultipleSelector,
  // argTypes: { postCount: { control: { type: "range", min: 1, max: 100 } } },
  args: {
    // params: { page: 1 },
    // postCount: 10,
  },
} satisfies Meta<typeof MultipleSelector>;
export default meta;

type Story = StoryObj<typeof meta>;

// Note that after we set up MSW globally, our orginal story is broken
// export const Home: Story = {};

export const Default: Story = {
  args: {
    options: ["red", "blue", "green"].map((color) => ({
      value: color,
      label: color,
    })),
    value: [{ value: "red", label: "red" }],
  },
};
