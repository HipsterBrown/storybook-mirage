import React from "react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Page } from "./Page";
import * as HeaderStories from "./Header.stories";

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    mirage: {
      timing: 1000,
    },
  },
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};
LoggedIn.play = async ({ canvasElement }) => {
  const screen = within(canvasElement);
  expect(screen.getByRole("heading", { name: "Pages in Storybook" }));
  expect(await screen.findByRole("button", { name: /Log out/, timeout: 3000 }));
};

export const LoggedOut = Template.bind({});
LoggedOut.parameters = {
  mirage: {
    handlers: {
      get: {
        "/api/user": [404, {}, null],
      },
    },
  },
};
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
