export const SESSION_COOKIE_NAME = "pelagahub_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 hari

function getSecretKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET belum diset di environment variable.");
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string): Promise<string> {
  const key = await getSecretKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );
  return bytesToHex(signature);
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = `${Date.now() + SESSION_TTL_MS}`;
  const signature = await sign(expiresAt);
  return `${expiresAt}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;

  const key = await getSecretKey();
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    hexToBytes(signature) as BufferSource,
    new TextEncoder().encode(expiresAt)
  );
  if (!valid) return false;

  const expiresAtNum = Number(expiresAt);
  if (!Number.isFinite(expiresAtNum) || Date.now() > expiresAtNum) return false;

  return true;
}

async function sha256(value: string): Promise<ArrayBuffer> {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
}

function buffersEqual(a: ArrayBuffer, b: ArrayBuffer): boolean {
  const aBytes = new Uint8Array(a);
  const bBytes = new Uint8Array(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
  return diff === 0;
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) return false;

  const [usernameOk, passwordOk] = await Promise.all([
    sha256(username).then(async (h) => buffersEqual(h, await sha256(adminUsername))),
    sha256(password).then(async (h) => buffersEqual(h, await sha256(adminPassword))),
  ]);

  return usernameOk && passwordOk;
}
