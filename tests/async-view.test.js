/* eslint-disable no-return-assign */
const React = require("react");
const browserEnv = require("browser-env");
const { AsyncView } = require("../dist/index.cjs");
const got = require("got");
const { render, waitFor } = require("@testing-library/react");

browserEnv();

const ERROR_MESSAGE = "failed to get data";

const fetchPostSuccess = () =>
  got("https://jsonplaceholder.typicode.com/todos/1").json();

const fetchPostError = () => Promise.reject(ERROR_MESSAGE);

test("<AsyncView data={fetchPostSuccess} />", (done) => {
  async function tester() {
    try {
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
        expect(getByText(networkData.title)).toBeTruthy();
      });
      done();
    } catch (err) {
      done(err);
    }
  }

  tester();
});

test("<AsyncView data={fetchPostError} />", (done) => {
  async function tester() {
    try {
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
      await waitFor(() => expect(getByText(ERROR_MESSAGE)).toBeTruthy());
      done();
    } catch (err) {
      done(err);
    }
  }

  tester();
});

// TODO: add hook example code and render and test hooks
// need to test initial render of loading, then error state , data state and refetched(loading + data state again) state.
