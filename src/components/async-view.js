import { useAsync } from "../hooks/use-async";

export function AsyncView({ children, data: dataFunction, ...props }) {
  const { data, error, loading } = useAsync(dataFunction);

  return children({
    data,
    loading,
    error,
  });
}
