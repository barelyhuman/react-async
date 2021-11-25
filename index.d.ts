import { ReactChild } from "react";

type AsyncViewProps<T extends {}> = {
  [x: string]: any;
  children: ReactChild;
  data: () => Promise<any>;
  options?: UseAsyncOptions<T>;
};

type UseAsyncOptions<T> = {
  params: T;
  pause: boolean;
};

export declare function AsyncView<T extends {}>({
  children,
  data: dataFunction,
  options,
  ...props
}: AsyncViewProps<T>): any;

export declare function useAsyncEffect(
  effect: (() => Promise<void>) | undefined,
  deps: any[]
): void;

export declare function useAsync<T extends {}, X extends {}>(
  fetcher?: (params: T) => Promise<X>,
  args?: UseAsyncOptions<T>
): {
  data: null;
  loading: boolean;
  error: null;
  refetch(params: T): void;
};
