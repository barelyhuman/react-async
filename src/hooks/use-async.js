import { useState } from "react";
import { useAsyncEffect } from "./use-async-effect";

export function useAsync(fetcher = async () => {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useAsyncEffect(async () => {
    try {
      setLoading(true);
      const data = await fetcher();
      setData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, []);

  return { data, loading, error };
}
