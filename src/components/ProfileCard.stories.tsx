import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { http, HttpResponse } from "msw";

import ProfileCard from "./ProfileCard";
// import ErrorPage from '../../error'
// import { range, createPost, reset } from '../../../lib/data.mock'

const meta = {
  title: "ProfileCard",
  component: ProfileCard,
  // argTypes: { postCount: { control: { type: "range", min: 1, max: 100 } } },
  args: {
    // params: { page: 1 },
    // postCount: 10,
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 250,
    height: 330,
    aspectRatio: "portrait",
    className: "w-[250px]",
    profile: {
      id: "bird",
      name: "Larry Bird",
      pic: "/larry-bird.jpg",
      oinks: 80,
      description:
        "Larry Bird is an American former professional basketball player, coach, and executive in the National Basketball Association ...",
    },
  },
};

export const Square: Story = {
  args: {
    ...Default.args,
    aspectRatio: "square",
  },
};
