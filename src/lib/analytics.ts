import posthog from "posthog-js";

let hasInitialized = false;
const firedEventKeys = new Set<string>();

export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (hasInitialized) return;
  if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key) return;

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    autocapture: true,
  });

  hasInitialized = true;
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  initAnalytics();
  posthog.capture(eventName, properties);
}

export function trackEventOnce(
  eventName: string,
  properties?: Record<string, unknown>,
  key?: string
) {
  if (typeof window === "undefined") return;
  const eventKey = key ?? eventName;
  if (firedEventKeys.has(eventKey)) return;
  firedEventKeys.add(eventKey);
  trackEvent(eventName, properties);
}

export { posthog };
