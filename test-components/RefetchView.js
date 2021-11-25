import React from "react";
import { useAsync } from "../src/index.js";

function RefetchView({ pause = false, index = 0 }) {
  const { loading, data, refetch } = useAsync(fetcher, {
    pause: pause,
    params: index++,
  });

  if (loading) {
    return <></>;
  }

  return (
    <>
      <button onClick={refetch}>{data}</button>
    </>
  );
}

async function fetcher(index) {
  if (index === 0) {
    return "hello";
  }

  return "world";
}

export { RefetchView };
