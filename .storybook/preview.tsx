import React from "react";
import type { Preview } from "@storybook/react";

import { PageLayout } from "../src/app/components/PageLayout";
import { postIds, getItem } from "../src/lib/data.mock";
import { http, HttpResponse } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/app/globals.css";

initialize({ onUnhandledRequest: "warn" });

const preview: Preview = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://hacker-news.firebaseio.com/v0/topstories.json", () =>
          HttpResponse.json(postIds())
        ),
        http.get<{ id: string }>(
          "https://hacker-news.firebaseio.com/v0/item/:id.json",
          ({ params }) => HttpResponse.json(getItem(parseInt(params.id, 10)))
        ),
      ],
    },
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      viewports: {
        small: { name: "Small", styles: { width: "640px", height: "800px" } },
        large: { name: "Large", styles: { width: "1024px", height: "1000px" } },
      },
    },
    chromatic: {
      modes: {
        mobile: { viewport: "small" },
        desktop: { viewport: "large" },
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
