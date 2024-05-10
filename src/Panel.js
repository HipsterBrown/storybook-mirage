import { useAddonState, useChannel } from '@storybook/manager-api';
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";

export const Panel = props => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    requests: [],
    unhandled: [],
    errors: []
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.REQUEST]: event => {
      setState({ ...results, requests: results.requests.concat(event) });
    },
    [EVENTS.UNHANDLED]: event => {
      setState({ ...results, unhandled: results.unhandled.concat(event) });
    },
    [EVENTS.ERROR]: event => {
      setState({ ...results, errors: results.errors.concat(event) });
    }
  });

  return (
    <AddonPanel {...props}>
      <PanelContent
        results={results}
        onSetResponse={values => emit(EVENTS.SET, values)}
      />
    </AddonPanel>
  );
};
