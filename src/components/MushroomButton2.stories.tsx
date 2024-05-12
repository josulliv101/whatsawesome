import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { http, HttpResponse } from "msw";

import MushroomButton2 from "./MushroomButton2";
// import ErrorPage from '../../error'
// import { range, createPost, reset } from '../../../lib/data.mock'

const meta = {
  title: "MushroomButton2",
  component: MushroomButton2,
  // argTypes: { postCount: { control: { type: "range", min: 1, max: 100 } } },
  args: {
    // params: { page: 1 },
    // postCount: 10,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MushroomButton2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const IsPending: Story = {
  args: {
    initialIsPending: true,
  },
};
