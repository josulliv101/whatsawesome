import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { http, HttpResponse } from "msw";

import HubPage from "./page";
import PageContent from "./PageContent";
import { mockProfilesByTag } from "@/lib/data.mock";
import { Profile } from "@/lib/profile";

const meta = {
  title: "app/HubPage",
  component: PageContent,
  argTypes: {
    // profilesByTag: {},
    // postCount: { control: { type: "range", min: 1, max: 100 } },
  },
  args: {
    // params: { page: 1, tags: ["boston", "place"] },
    hub: "boston",

    profilesByTag: undefined, //mockProfilesByTag,
    // reasons: [{ id: "abc", votes: 1, reason: "foobar", rating: 1 }],
    tagsToUse: [],
    filterId: "",
    filterOptions: [],
  },
} satisfies Meta<typeof PageContent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Mocked: Story = {
  args: {
    primaryTag: "person",
    tags: ["sports", "musician"],
  },
  parameters: {
    msw: {
      handlers: [
        http.get(
          "https://hacker-news.firebaseio.com/v0/topstories.json",
          () => {
            return HttpResponse.json([1]);
          }
        ),
        http.get("https://hacker-news.firebaseio.com/v0/item/1.json", () => {
          return HttpResponse.json({
            id: 1,
            time: Date.now(),
            user: "shilman",
            url: "http://storybook.js.org",
            title: "Storybook + Next.js = ❤️",
            score: 999,
          });
        }),
      ],
    },

    nextjs: {
      appDirectory: true,
    },
  },
};

export const MockedWithTags = {
  ...Mocked,
  //   params: {
  //     tags: ["boston", "place"],
  //   },
};

export const TabSelectedPlace = {
  ...Mocked,
  primaryTag: "place",
  tags: ["college"],
  //   params: {
  //     tags: ["boston", "place"],
  //   },
};

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
