import { useAsync } from "../hooks/use-async";

export function AsyncView({ children, data: dataFunction, ...props }) {
  const { data, error, loading, refetch } = useAsync(dataFunction);

  return children({
    data,
    loading,
    error,
    refetch,
  });
}
