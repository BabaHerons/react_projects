import { useEffect } from "react";

export function usePageTitle(title: string, suffix = "Todo V3") {
  useEffect(() => {
    if (!title) return;

    document.title = suffix
      ? `${title} | ${suffix}`
      : title;

    // optional cleanup (useful in rare cases)
    return () => {
      document.title = suffix;
    };
  }, [title, suffix]);
}
