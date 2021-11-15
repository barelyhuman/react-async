/* eslint-disable no-return-assign */
const test = require("ava").serial;
const React = require("react");
const browserEnv = require("browser-env");
const { AsyncView } = require("../src/index.js");
const got = require("got");
const { render, waitFor } = require("@testing-library/react");

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
  await waitFor(() => t.assert(getByText(networkData.title)));
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
  await waitFor(() => t.assert(getByText(ERROR_MESSAGE)));
});
