import { withServer } from "../preset";
import { makeServer } from "../stories/server";

export const decorators = [withServer(makeServer)];
