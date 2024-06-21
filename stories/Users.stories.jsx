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
        { attrs: { name: "John Doe" } },
        { attrs: { name: "Luke Skywalker" } },
        { traits: ["withColor"], count: 3 },
        { count: 2 },
      ],
    },
  },
};
