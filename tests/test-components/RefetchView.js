const React = require("react");
const { useAsync } = require("../../dist/index.js");

function RefetchView({ pause = false, index = 0 }) {
  const { data, refetch } = (0, useAsync)(fetcher, {
    pause: pause,
    params: index++,
  });
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

async function fetcher(index) {
  if (index === 0) {
    return "hello";
  }

  return "world";
}

exports.RefetchView = RefetchView;
