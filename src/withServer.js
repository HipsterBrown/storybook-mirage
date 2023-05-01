import { useEffect, useParameter, useChannel, addons } from "@storybook/addons";
import { Response } from "miragejs";
import { FORCE_RE_RENDER } from "@storybook/core-events";
import { PARAM_KEY, EVENTS } from "./constants";

export const withServer = (makeServer) => (StoryFn) => {
  const { logging, fixtures, handlers, timing, instance, factorySeeds } =
    useParameter(PARAM_KEY, {
      handlers: null,
      fixtures: null,
      logging: false,
      timing: null,
      instance: null,
      factorySeeds: null,
    });

  globalThis.server = globalThis.server ?? instance ?? makeServer();
  globalThis.server.logging = logging;
  
  const emit = useChannel({
    [EVENTS.SET]: ({ verb, path, response }) => {
      globalThis.server[verb.toLowerCase()](path, () => {
        if (typeof response === "number") return new Response(response);
        if (Array.isArray(response)) return new Response(...response);
        return new Response(200, {}, response);
      });
      addons.getChannel().emit(FORCE_RE_RENDER);
    },
  });

  if (fixtures) globalThis.server.db.loadData(fixtures);
  if (timing !== null) globalThis.server.timing = timing;
  if (handlers) {
    Object.keys(handlers).forEach((method) => {
      const set = handlers[method];
      Object.keys(set).forEach((route) => {
        const value = set[route];
        globalThis.server[method](route, () => {
          if (typeof value === "number") return new Response(value);
          if (Array.isArray(value)) return new Response(...value);
          return new Response(200, {}, value);
        });
      });
    });
  }
  if (factorySeeds) {
    Object.keys(factorySeeds).forEach((factoryName) => {
      const items = factorySeeds[factoryName];
      if (typeof items === "number")
        globalThis.server.createList(factoryName, items);
      else if (typeof items === "object") {
        items.forEach((item) => {
          const { traits = [], attrs = {}, count = 1 } = item;
          globalThis.server.createList(factoryName, count, ...traits, attrs);
        });
      }
    });
  }

  const { handledRequest, unhandledRequest, erroredRequest } =
    globalThis.server.pretender;
  globalThis.server.pretender.handledRequest = function (verb, path, request) {
    handledRequest(verb, path, request);
    emit(EVENTS.REQUEST, { verb, path, request });
  };

  globalThis.server.pretender.unhandledRequest = function (
    verb,
    path,
    request
  ) {
    unhandledRequest(verb, path, request);
    emit(EVENTS.UNHANDLED, { verb, path, request });
  };

  globalThis.server.pretender.erroredRequest = function (
    verb,
    path,
    request,
    error
  ) {
    erroredRequest(verb, path, request, error);
    emit(EVENTS.ERROR, { verb, path, request, error });
  };

  return StoryFn();
};
