import { useCallback, useEffect, useState } from "react";

/**
 * Loads data with loading / error state and a reload() function.
 * `fetcher` must be a stable reference (module-level function or useCallback).
 */
export function useAsyncData(fetcher) {
  const [state, setState] = useState({ data: null, error: "", loading: true });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let active = true;

    fetcher()
      .then((data) => {
        if (active) setState({ data, error: "", loading: false });
      })
      .catch((err) => {
        if (active) {
          setState({
            data: null,
            error: err.message || "Something went wrong.",
            loading: false,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [fetcher, tick]);

  const reload = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    setTick((value) => value + 1);
  }, []);

  return { ...state, reload };
}