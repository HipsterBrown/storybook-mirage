import { createServer } from "miragejs";

export const makeServer = () =>
  createServer({
    routes() {
      this.get("/api/user", () => ({
        name: "Jim Jam"
      }));
    }
  });
