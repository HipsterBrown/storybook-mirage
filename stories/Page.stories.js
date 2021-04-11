import React from "react";

import { Page } from "./Page";
import * as HeaderStories from "./Header.stories";

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    mirage: {
      timing: 1000
    }
  }
};

const Template = args => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args
};

export const LoggedOut = Template.bind({});
LoggedOut.parameters = {
  mirage: {
    handlers: {
      get: {
        "/api/user": [404, {}, null]
      }
    }
  }
};
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args
};
