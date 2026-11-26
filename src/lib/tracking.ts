export type AgentEventName =
  | 'page_view'
  | 'article_filter'
  | 'article_read'
  | 'hed_calculate'
  | 'service_select'
  | 'booking_submit'
  | 'citation_copy'
  | 'newsletter_subscribe'
  | 'contact_submit';

export interface AgentEventPayload {
  event: AgentEventName;
  entityType?: string;
  entityId?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __tkEvents?: Array<AgentEventPayload & { timestamp: string; path: string }>;
  }
}

export function trackAgentEvent(payload: AgentEventPayload): void {
  if (typeof window === 'undefined') return;

  const enriched = {
    ...payload,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(enriched);

  window.__tkEvents = window.__tkEvents || [];
  window.__tkEvents.push(enriched);

  window.dispatchEvent(new CustomEvent('tk:agent_event', { detail: enriched }));
}
