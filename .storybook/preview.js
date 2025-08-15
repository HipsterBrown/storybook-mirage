import { withServer } from "../src/preset/index.js";
import { makeServer } from "../stories/server";

const preview = {
  decorators: [withServer],
  tags: ["autodocs"],
  async beforeEach(context) {
    context.server = makeServer();
  },
  async afterEach(context) {
    context.server.shutdown();
    delete context.server;
  },
};

export default preview;
