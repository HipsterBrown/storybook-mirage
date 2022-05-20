import { createServer, Factory, Model } from "miragejs";

export const makeServer = () =>
  createServer({
    routes() {
      this.get("/api/user", () => ({
        name: "Jim Jam"
      }));
      this.get("/api/users");
    },
    models: {
      user: Model,
    },
    seeds() {},
    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`;
        },
      }),
    },
  });
