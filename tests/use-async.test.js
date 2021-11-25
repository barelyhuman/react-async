/* eslint-disable no-return-assign */

import { serial as test } from "ava";
import React from "react";
import browserEnv from "browser-env";
import { RefetchView } from "../test-components/RefetchView.js";
import { cleanup, render, waitFor } from "@testing-library/react";

browserEnv();
test.afterEach(cleanup);

test("useAsync | refetch", async (t) => {
  const { getByText, queryByText } = render(<RefetchView index={0} />);
  await waitFor(() => {
    t.truthy(getByText("hello"));
  });
  const buttonEl = queryByText("hello");
  buttonEl.click();
  await waitFor(() => {
    t.truthy(getByText("world"));
  });
});

test("useAsync | pause", async (t) => {
  const { getByText, queryByText, rerender } = render(
    <RefetchView pause={true} index={0} />
  );

  await waitFor(() => {
    t.falsy(queryByText("hello"));
  });
  rerender(<RefetchView pause={false} index={0} />);
  await waitFor(() => {
    t.truthy(getByText("hello"));
  });
});

test("useAsync | multiple pauses", async (t) => {
  const { getByText, queryByText, rerender } = render(
    <RefetchView pause={true} index={0} />
  );
  await waitFor(() => {
    t.falsy(queryByText("hello"));
  });
  rerender(<RefetchView pause={false} index={0} />);
  await waitFor(() => {
    t.truthy(getByText("hello"));
  });
  const buttonElm = queryByText("hello");
  buttonElm.click();
  await waitFor(() => {
    t.truthy(getByText("world"));
  });
});
