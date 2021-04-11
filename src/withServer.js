import {
  useEffect,
  useGlobals,
  useParameter,
  useRef,
  useChannel,
  addons
} from "@storybook/addons";
import { Response } from "miragejs";
import { FORCE_RE_RENDER } from "@storybook/core-events";
import { PARAM_KEY, EVENTS, ADDON_ID } from "./constants";

export const withServer = makeServer => (StoryFn, context) => {
  const server = useRef();
  const { logging, fixtures, errors, timing, instance } = useParameter(
    PARAM_KEY,
    {
      errors: null,
      fixtures: null,
      logging: false,
      timing: null,
      instance: null
    }
  );
  const emit = useChannel({
    [EVENTS.SET]: ({ verb, path, response }) => {
      server.current[verb.toLowerCase()](path, () => {
        if (typeof response === "number") return new Response(response);
        if (Array.isArray(response)) return new Response(...response);
        return new Response(200, {}, response);
      });
      addons.getChannel().emit(FORCE_RE_RENDER);
    }
  });

  useEffect(() => {
    if (instance) {
      server.current = instance;
    }
    if (makeServer) {
      server.current = makeServer();
    }
    if (!server.current) return;

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

    const {
      handledRequest,
      unhandledRequest,
      erroredRequest
    } = server.current.pretender;
    server.current.pretender.handledRequest = function (verb, path, request) {
      handledRequest(verb, path, request);
      emit(EVENTS.REQUEST, { verb, path, request });
    };

    server.current.pretender.unhandledRequest = function (verb, path, request) {
      unhandledRequest(verb, path, request);
      emit(EVENTS.UNHANDLED, { verb, path, request });
    };

    server.current.pretender.erroredRequest = function (
      verb,
      path,
      request,
      error
    ) {
      erroredRequest(verb, path, request, error);
      emit(EVENTS.ERROR, { verb, path, request, error });
    };

    return () => server.current.shutdown();
  }, []);

  return StoryFn();
};
