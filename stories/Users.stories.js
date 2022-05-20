import React from "react";

import { Users } from "./Users";

export default {
  title: "Example/Seeded Users",
  component: Users,
  parameters: {
    mirage: {
      timing: 1000,
    },
  },
};

const Template = (args) => <Users {...args} />;

export const UserList = Template.bind({});

UserList.parameters = {
  mirage: {
    factorySeeds: {
      user: [
        { traits: [{ name: "John Doe" }] },
        { traits: [{ name: "Luke Skywalker" }] },
        { traits: [], count: 4 },
      ],
    },
  },
};
