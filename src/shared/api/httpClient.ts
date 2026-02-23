export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class HttpError extends Error {
  public readonly status: number;
  public readonly payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.payload = payload;
  }
}

type RequestOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

function extractErrorMessage(payload: unknown): string | null {
  if (payload && typeof payload === "object" && "message" in payload) {
    const msg = (payload as { message?: unknown }).message;

    if (typeof msg === "string") return msg;
    if (typeof msg === "number" || typeof msg === "boolean") return String(msg);
  }

  return null;
}

export async function http<T>(url: string, opts: RequestOptions = {}): Promise<T> {
  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers ?? {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  const payload: unknown = isJson
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => undefined);

  if (!res.ok) {
    const msg = extractErrorMessage(payload) ?? `Request failed with status ${res.status}`;
    throw new HttpError(msg, res.status, payload);
  }

  return payload as T;
}
