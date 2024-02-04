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
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TagFilter>;
export default meta;

type Story = StoryObj<typeof meta>;

// Note that after we set up MSW globally, our orginal story is broken
// export const Home: Story = {};

const getMockOptions = (activeTags: string[] = []) => {
  return ["sports", "musician", "rapper", "singer", "nba", "nfl"].map(
    (tag) => ({
      label: tag,
      value: tag,
      active: activeTags.includes(tag),
    })
  );
};

export const NoActiveTags: Story = {
  args: {
    // activeTags: ["sports", "rapper"],
    // column,
    title: "tag filter",
    options: getMockOptions(),
    initialActiveTags: [],
    hub: "boston",
    primaryTag: "person",
    filterId: "",
    filterOptions: [],
    // onFilterChange: (tags) => console.log("tags", tags),
  },
};

export const SingleTagActive: Story = {
  args: {
    ...NoActiveTags.args,
    options: getMockOptions(["sports"]),
  },
};

export const SmallNumberTagsActive: Story = {
  args: {
    ...NoActiveTags.args,
    options: getMockOptions(["sports", "rapper"]),
  },
};

export const LargeNumberTagsActive: Story = {
  args: {
    ...NoActiveTags.args,
    options: getMockOptions(["sports", "rapper", "nba", "nfl", "musician"]),
  },
};
