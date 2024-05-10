import React from "react";
import { themes, convert } from "@storybook/theming";
import { useAddonState } from "@storybook/manager-api";
import { nanoid } from "nanoid";
import { ADDON_ID } from "../constants";
import {
  TabsState,
  Placeholder,
  Form,
  Spaced,
} from "@storybook/components";
import {
  ObjectControl
} from "@storybook/blocks"

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent = ({ results, onSetResponse }) => {
  const [response, setResponse] = useAddonState(`${ADDON_ID}/response`, {
    statusCode: 200,
    headers: {},
    body: {},
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      verb: form.elements.verb.value,
      path: form.elements.path.value,
      response: [response.statusCode, response.headers, response.body],
    };
    onSetResponse(values);
  };
  return (
    <TabsState
      initial="form"
      backgroundColor={convert(themes.normal).background.hoverable}
    >
      <div
        id="form"
        title="Custom Response"
        color={convert(themes.normal).color.primary}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Field key="verb" label="Verb">
            <Form.Select defaultValue="GET" name="verb" id="verb">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </Form.Select>
          </Form.Field>
          <Form.Field key="path" label="Path">
            <Form.Input size="auto" name="path" id="path" />
          </Form.Field>
          <Form.Field key="response" label="Response">
            <ObjectControl
              value={response}
              name="response"
              onChange={setResponse}
            />
          </Form.Field>
          <Spaced outer={true} row={1}>
            <Spaced outer={true} col={1}>
              <Form.Button size="auto">Submit</Form.Button>
            </Spaced>
          </Spaced>
        </Form>
      </div>
      <div
        id="requests"
        title="Requests"
        color={convert(themes.normal).color.positive}
      >
        <Placeholder style={{ textAlign: "left" }}>
          {results.requests.map(({ verb, path, request }) => (
            <details key={nanoid()}>
              <summary>
                {verb} {path}
              </summary>
              <pre>{JSON.stringify(request, null, 2)}</pre>
            </details>
          ))}
        </Placeholder>
      </div>
      <div
        id="unhandled"
        title="Unhandled"
        color={convert(themes.normal).color.warning}
      >
        <Placeholder style={{ textAlign: "left" }}>
          {results.unhandled.map(({ verb, path, request }) => (
            <details key={nanoid()}>
              <summary>
                {verb} {path}
              </summary>
              <pre>{JSON.stringify(request, null, 2)}</pre>
            </details>
          ))}
        </Placeholder>
      </div>
      <div
        id="errors"
        title="Errors"
        color={convert(themes.normal).color.negative}
      >
        <Placeholder style={{ textAlign: "left" }}>
          {results.errors.map(({ verb, path, request, error }) => (
            <details key={nanoid()}>
              <summary>
                {verb} {path} : {error.toString()}
              </summary>
              <pre>{JSON.stringify(request, null, 2)}</pre>
            </details>
          ))}
        </Placeholder>
      </div>
    </TabsState>
  );
};
