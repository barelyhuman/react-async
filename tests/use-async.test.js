/* eslint-disable no-return-assign */
const React = require("react");
const browserEnv = require("browser-env");
const { RefetchView } = require("./test-components/RefetchView");
const { render, waitFor } = require("@testing-library/react");

browserEnv();

test("useAsync | refetch", (done) => {
  async function tester() {
    try {
      const { getByText, queryByText } = render(<RefetchView index={0} />);
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

test("useAsync | pause", (done) => {
  async function tester() {
    try {
      const { queryByText, rerender } = render(
        <RefetchView pause={true} index={0} />
      );
      await waitFor(() => {
        expect(queryByText("hello")).toBeNull();
      });
      rerender(<RefetchView pause={false} index={0} />);
      await waitFor(() => {
        expect(queryByText("hello")).toBeTruthy();
      });
      done();
    } catch (err) {
      done(err);
    }
  }

  tester();
});

// TODO: add tests to check first call and 2nd call checks
