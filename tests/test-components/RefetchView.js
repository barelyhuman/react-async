const React = require("react");
const { useAsync } = require("../../dist/index.cjs");

function RefetchView() {
  const { data, refetch } = (0, useAsync)(fetcher);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "button",
      {
        onClick: refetch,
      },
      data
    )
  );
}

let index = 0;

async function fetcher() {
  if (index === 0) {
    index += 1;
    return "hello";
  }

  return "world";
}

exports.RefetchView = RefetchView;
