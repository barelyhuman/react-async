import { useAsync } from "../hooks/use-async";

export function AsyncView({
  children,
  data: dataFunction,
  options = {},
  ...props
}) {
  const { data, error, loading, refetch } = useAsync(dataFunction, options);

  return children({
    data,
    loading,
    error,
    refetch,
  });
}
