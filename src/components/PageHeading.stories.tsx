import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { http, HttpResponse } from "msw";

import PageHeading from "./PageHeading";
// import ErrorPage from '../../error'
// import { range, createPost, reset } from '../../../lib/data.mock'

const meta = {
  title: "PageHeading",
  component: PageHeading,
  // argTypes: { postCount: { control: { type: "range", min: 1, max: 100 } } },
  args: {
    // params: { page: 1 },
    // postCount: 10,
  },
} satisfies Meta<typeof PageHeading>;
export default meta;

type Story = StoryObj<typeof meta>;

// Note that after we set up MSW globally, our orginal story is broken
// export const Home: Story = {};

export const Default: Story = {
  args: {
    heading: "Magni dolores eos qui ratione voluptatem",
    subhead:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor.",
  },
};

// export const MockedNew = {
//   ...Home,
//   // loaders: [
//   //   () => {
//   //     reset();
//   //     createPost({
//   //       id: -1,
//   //       user: "shilman",
//   //       url: "http://storybook.js.org",
//   //       title: "Storybook + Next.js = ❤️",
//   //       score: 999,
//   //     });
//   //   },
//   // ],
// };

// export const FullPage = {
//   args: {
//     postCount: 30,
//   },
//   loaders: [
//     ({ args: { postCount } }) => {
//       reset();
//       range(postCount).map(() => createPost());
//     },
//   ],
// };

// export const Upvoted: Story = {
//   ...Home,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const votes = await canvas.findAllByText("▲");
//     await userEvent.click(votes[0]);
//   },
// };

// export const Empty: Story = {
//   loaders: [
//     () => {
//       reset();
//     },
//   ],
//   args: {
//     params: { page: 1 },
//   },
// };

// export const ErrorStory: Story = {
//   name: "Error",
//   render: () => <ErrorPage error={new Error("Boom!")} />,
// };
