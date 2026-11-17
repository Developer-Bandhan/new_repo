/**
 * Thin fetch client for the Express API.
 * - Access token lives in memory only (not localStorage) to limit XSS damage.
 * - Refresh token is an httpOnly cookie set by the API; `credentials: 'include'` sends it.
 * - On TOKEN_EXPIRED the request is retried once after a silent refresh.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: Record<string, unknown>) {
    super(message);
  }
}

let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => {
  accessToken = t;
};

let refreshing: Promise<boolean> | null = null;
let onRefreshed: ((data: unknown) => void) | null = null;
/** auth.tsx registers this so a silent refresh also updates the user in context. */
export const setRefreshListener = (fn: ((data: unknown) => void) | null) => {
  onRefreshed = fn;
};

export async function refreshSession(): Promise<boolean> {
  if (!refreshing) {
    refreshing = (async () => {
      try {
        const res = await fetch(`${API_URL}/auth/refresh`, { method: 'POST', credentials: 'include' });
        if (!res.ok) {
          setAccessToken(null);
          return false;
        }
        const body = await res.json();
        setAccessToken(body.data.accessToken);
        onRefreshed?.(body.data);
        return true;
      } catch {
        return false;
      } finally {
        setTimeout(() => (refreshing = null), 0);
      }
    })();
  }
  return refreshing;
}

type Options = Omit<RequestInit, 'body'> & { body?: unknown; retry?: boolean };

export async function api<T = unknown>(path: string, { body, retry = true, headers, ...init }: Options = {}): Promise<T> {
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        ...(isForm || body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR', 'সার্ভারের সাথে সংযোগ হচ্ছে না। একটু পরে আবার চেষ্টা করুন।');
  }

  if (res.status === 204) return undefined as T;
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = json?.error || {};
    if (res.status === 401 && err.code === 'TOKEN_EXPIRED' && retry && (await refreshSession())) {
      return api<T>(path, { body, retry: false, headers, ...init });
    }
    throw new ApiError(res.status, err.code || 'ERROR', err.message || 'কিছু একটা সমস্যা হয়েছে', err.details);
  }
  return json.data as T;
}

/** Bangla messages for the API error codes users actually see. */
const MESSAGES_BN: Record<string, string> = {
  ACCOUNT_NOT_FOUND: 'এই নম্বরে কোনো অ্যাকাউন্ট নেই। আগে রেজিস্টার করুন।',
  PHONE_TAKEN: 'এই নম্বরে আগেই অ্যাকাউন্ট আছে। লগইন করুন।',
  EMAIL_TAKEN: 'এই ইমেইল আগেই ব্যবহার হয়েছে।',
  OTP_INVALID: 'কোডটি সঠিক নয়।',
  OTP_EXPIRED: 'কোডের মেয়াদ শেষ। নতুন কোড নিন।',
  OTP_LOCKED: 'অনেকবার ভুল কোড দিয়েছেন। নতুন কোড নিন।',
  OTP_COOLDOWN: 'একটু অপেক্ষা করে আবার কোড চান।',
  OTP_HOURLY_LIMIT: 'এই নম্বরে অনেকবার কোড চাওয়া হয়েছে। ১ ঘণ্টা পরে চেষ্টা করুন।',
  OTP_RATE_LIMIT: 'অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।',
  NOT_ON_WHATSAPP: 'এই নম্বরে WhatsApp নেই। আপনার WhatsApp নম্বর দিন।',
  OTP_SEND_FAILED: 'WhatsApp-এ কোড পাঠানো যায়নি। আবার চেষ্টা করুন।',
  ACCOUNT_BLOCKED: 'আপনার অ্যাকাউন্ট বন্ধ করা হয়েছে।',
  VALIDATION_ERROR: 'তথ্যগুলো ঠিকভাবে দিন।',
};

export const errorMessage = (e: unknown): string => {
  if (e instanceof ApiError) {
    if (e.code === 'OTP_INVALID' && typeof e.details?.attemptsLeft === 'number') {
      return `কোডটি সঠিক নয়। আর ${e.details.attemptsLeft} বার চেষ্টা করতে পারবেন।`;
    }
    return MESSAGES_BN[e.code] || e.message;
  }
  return 'কিছু একটা সমস্যা হয়েছে';
};
