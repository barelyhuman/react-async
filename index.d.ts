import { ReactChild } from "react";

export declare function AsyncView({
  children,
  data: dataFunction,
  ...props
}: {
  [x: string]: any;
  children: ReactChild;
  data: () => Promise<any>;
}): any;

export declare function useAsyncEffect(
  effect: (() => Promise<void>) | undefined,
  deps: any[]
): void;

export declare function useAsync(fetcher?: () => Promise<void>): {
  data: any | null;
  loading: boolean;
  error: any | null;
  refetch(): void;
};
