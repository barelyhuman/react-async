import { useEffect } from "react";

export function useAsyncEffect(effect = async () => {}, deps) {
  useEffect(() => {
    const asyncActions = async () => {
      await effect();
    };

    asyncActions();
  }, [...deps]);
}
