/* eslint-disable no-return-assign */
const React = require("react");
const browserEnv = require("browser-env");
const { RefetchView } = require("./test-components/RefetchView");
const { render, waitFor } = require("@testing-library/react");

browserEnv();

test("useAsync | refetch", (done) => {
  async function tester() {
    try {
      const { getByText, queryByText } = render(<RefetchView />);
      await waitFor(() => {
        expect(getByText("hello")).toBeTruthy();
      });
      const buttonEl = queryByText("hello");
      buttonEl.click();
      await waitFor(() => {
        expect(getByText("world")).toBeTruthy();
      });
      done();
    } catch (err) {
      done(err);
    }
  }

  tester();
});
