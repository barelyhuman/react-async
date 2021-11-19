import { useCallback, useRef, useState } from "react";
import { useAsyncEffect } from "./use-async-effect";

export function useAsync(
  fetcher = async () => {},
  args = { initialParams, pause: false }
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const firstCall = useRef(true).current;

  const _fetcherCB = useCallback(
    async (params) => {
      try {
        if (args.pause) {
          return;
        }
        setLoading(true);
        const data = await fetcher(firstCall ? args.initialParams : params);
        firstCall = false;
        setData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    },
    [args.pause]
  );

  useAsyncEffect(async () => {
    _fetcherCB();
  }, [_fetcherCB]);

  return {
    data,
    loading,
    error,
    refetch(params) {
      _fetcherCB(params);
    },
  };
}
