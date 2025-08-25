import { withServer } from "../src/preset/index.js";
import { makeServer } from "../stories/server";

const preview = {
  decorators: [withServer],
  tags: ["autodocs"],
  async beforeEach(context) {
    context.server = makeServer();
    return async () => {
      context.server.shutdown();
    };
  },
};

export default preview;
