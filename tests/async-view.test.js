/* eslint-disable no-return-assign */
import { serial as test } from "ava";
import React from "react";
import browserEnv from "browser-env";
import { AsyncView } from "../src/index.js";
import got from "got";
import { render, waitFor } from "@testing-library/react";

browserEnv();

const ERROR_MESSAGE = "failed to get data";

const fetchPostSuccess = () =>
  got("https://jsonplaceholder.typicode.com/todos/1").json();

const fetchPostError = () => Promise.reject(ERROR_MESSAGE);

test("<AsyncView data={fetchPostSuccess} />", async (t) => {
  const networkData = await fetchPostSuccess();
  const { getByText } = render(
    <AsyncView data={fetchPostSuccess}>
      {({ data, loading }) => {
        if (loading) {
          return <p>loading</p>;
        }
        return <p>{data.title}</p>;
      }}
    </AsyncView>
  );
  await waitFor(() => {
    t.truthy(getByText(networkData.title));
  });
});

test("<AsyncView data={fetchPostError} />", async (t) => {
  const { getByText } = render(
    <AsyncView data={fetchPostError}>
      {({ error, loading }) => {
        if (loading) {
          return <p>loading</p>;
        }
        return <p>{String(error)}</p>;
      }}
    </AsyncView>
  );
  await waitFor(() => t.truthy(getByText(ERROR_MESSAGE)));
});
