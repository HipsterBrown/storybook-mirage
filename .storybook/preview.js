import { withServer } from "../src/preset/index.js";
import { makeServer } from "../stories/server";

export const decorators = [withServer(makeServer)];
