const BASE_URL = import.meta.env.VITE_API_URL ||  "https://ai-message-be-service.vercel.app";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("access_token");
  const cleanBase = BASE_URL.replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${cleanBase}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json", // Force JSON response to avoid HTML views
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(fullUrl, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new ApiError(err.detail || "Request failed", res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};

export interface Business {
  id: number;
  name: string;
  slug: string;
  whatsapp_phone_number_id: string;
  whatsapp_access_token: string;
  is_active: boolean;
  created_at: string;
}

export interface CompanyInfo {
  id: number;
  business: number;
  question: string;
  answer: string;
}

export interface Contact {
  id: number;
  business: number;
  name: string;
  phone: string;
  email: string;
  tags?: string[];
  last_active?: string;
  assigned_agent?: string;
  created_at?: string;
}

export interface Message {
  id: number;
  business: number;
  contact: number;
  conversation: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChannelConnection {
  id: number;
  business: number;
  channel: "whatsapp" | "instagram" | "facebook" | "telegram";
  is_connected: boolean;
  phone_number_id?: string;
  access_token?: string;
  created_at: string;
}

export interface AutomationFlow {
  id: number;
  business: number;
  name: string;
  trigger: "new_message" | "keyword" | "ad_click" | "webhook" | "schedule";
  is_active: boolean;
  steps: AutomationStep[];
  created_at: string;
}

export interface AutomationStep {
  id: number;
  flow: number;
  order: number;
  action: "send_message" | "ask_question" | "save_field" | "tag" | "call_api" | "assign_agent" | "wait";
  config: Record<string, unknown>;
}

export interface Broadcast {
  id: number;
  business: number;
  name: string;
  channel: string;
  channel_type?: string;
  email_subject?: string;
  audience_segment: number | null;
  content: string;
  status: "draft" | "scheduled" | "sending" | "sent" | "failed";
  scheduled_at?: string;
  sent_count?: number;
  delivered_count?: number;
  failed_count?: number;
  created_at: string;
  contact_ids?: number[];
}

export interface Segment {
  id: number;
  business: number;
  name: string;
  filters: Record<string, unknown>;
  contact_count?: number;
}

export interface Tag {
  id: number;
  business: number;
  name: string;
  color?: string;
}

export interface CustomField {
  id: number;
  business: number;
  name: string;
  field_type: "text" | "number" | "date" | "select";
}

export interface AnalyticsEvent {
  id: number;
  business: number;
  event_type: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface Member {
  id: number;
  user: { id: number; email: string; name: string };
  role: "admin" | "manager" | "agent" | "viewer";
  business: number;
}

export interface Subscription {
  plan: string;
  billing_cycle: "monthly" | "annual";
  expires_at: string | null;
  is_active: boolean;
  complimentary: boolean;
  limits: {
    contacts: number;
    channels: number;
    users: number;
    automations: number;
    ai_assistant: boolean;
    branding: boolean;
  };
  usage: {
    contacts: { used: number; limit: number; ok: boolean };
    channels: { used: number; limit: number; ok: boolean };
    users: { used: number; limit: number; ok: boolean };
    automations: { used: number; limit: number; ok: boolean };
  };
}

export interface Conversation {
  id: number;
  contact: Contact;
  channel: number;
  channel_name: string;
  status: string;
  assigned_to: number | null;
  is_ai_enabled: boolean;
  last_message_at: string;
  created_at: string;
  last_message: { role: string; content: string; created_at: string } | null;
  unread_count: number;
}

export interface ContactTag {
  id: number;
  tag: Tag;
  created_at: string;
}
