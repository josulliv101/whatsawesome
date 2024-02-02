import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { TagFilter } from "./TagFilter";
// import ErrorPage from '../../error'
// import { range, createPost, reset } from '../../../lib/data.mock'

const meta = {
  title: "TagFilter",
  component: TagFilter,
  // argTypes: { onFilterChange: { action: "filter change" } },
  args: {
    // params: { page: 1 },
    // postCount: 10,
  },
} satisfies Meta<typeof TagFilter>;
export default meta;

type Story = StoryObj<typeof meta>;

// Note that after we set up MSW globally, our orginal story is broken
// export const Home: Story = {};

export const Default: Story = {
  args: {
    activeTags: ["sports", "rapper"],
    // column,
    title: "title",
    // options: [
    //   { label: "sports", value: "sports" },
    //   { label: "musician", value: "musician" },
    //   { label: "rapper", value: "rapper" },
    //   { label: "singer", value: "singer" },
    //   { label: "NBA", value: "nba" },
    //   { label: "NFL", value: "nfl" },
    // ],
    hub: "boston",
    primaryTag: "person",
    // onFilterChange: (tags) => console.log("tags", tags),
  },
};

export const ManySelectedTags: Story = {
  args: {
    ...Default.args,
    activeTags: ["sports", "rapper", "nba", "musician", "nfl"],
  },
};
