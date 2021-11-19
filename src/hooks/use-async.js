import { useCallback, useState } from "react";
import { useAsyncEffect } from "./use-async-effect";

export function useAsync(
  fetcher = async () => {},
  args = { initialParams: {}, pause: false }
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const _fetcherCB = useCallback(
    async (params) => {
      try {
        if (args.pause) {
          return;
        }
        setLoading(true);
        const data = await fetcher(params);
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
    // FIXME: if the pause is re-triggered due to a state change, the same initial data will
    // be used instead of using the newly received data,
    // possible solution is to use a ref to differentiate
    _fetcherCB(args.initialParams);
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
