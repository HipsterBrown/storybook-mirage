import { useEffect, useGlobals, useParameter, useRef } from "@storybook/addons";
import { Response } from "miragejs";
import { PARAM_KEY } from "./constants";

export const withServer = makeServer => (StoryFn, context) => {
  const server = useRef();
  const { logging, fixtures, errors, timing } = useParameter(PARAM_KEY, {
    errors: null,
    fixtures: null,
    logging: false,
    timing: null
  });

  useEffect(() => {
    server.current = makeServer();
    server.current.logging = logging;

    if (fixtures) server.current.db.loadData(fixtures);
    if (timing !== null) server.current.timing = timing;
    if (errors) {
      Object.keys(errors).forEach(route => {
        const value = errors[route];
        server.current.get(route, () => {
          if (typeof value === "number") return new Response(value);
          if (Array.isArray(value)) return new Response(...value);
          return new Response(200, {}, { errors: value });
        });
      });
    }

    return () => server.current.shutdown();
  }, []);

  return StoryFn();
};
