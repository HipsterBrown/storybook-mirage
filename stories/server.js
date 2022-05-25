import { createServer, Factory, Model, trait } from "miragejs";

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
        withColor: trait({
          color: ["Blue", "Red", "Green", "Yellow"][
            Math.round(Math.random() * 3)
          ],
        }),
      }),
    },
  });
