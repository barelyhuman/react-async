import { useIsomorphicLayoutEffect } from "./use-isomorphic-effect";

export function useAsyncEffect(effect = async () => {}, deps) {
  useIsomorphicLayoutEffect(() => {
    const asyncActions = async () => {
      await effect();
    };

    asyncActions();
  }, [...deps]);
}
