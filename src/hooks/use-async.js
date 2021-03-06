import { useCallback, useState } from "react";
import { useAsyncEffect } from "./use-async-effect";

export function useAsync(
  fetcher = async () => {},
  args = { params: {}, pause: false }
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
    _fetcherCB(args.params);
  }, [_fetcherCB]);

  return {
    data,
    loading,
    error,
    refetch(params) {
      _fetcherCB(params || args.params);
    },
  };
}
