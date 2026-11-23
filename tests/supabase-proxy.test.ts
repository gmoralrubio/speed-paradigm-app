import type { CookieMethodsServer } from "@supabase/ssr";
import { NextRequest } from "next/server";
import { afterEach, expect, test, vi } from "vitest";
import { proxy } from "@/proxy";

const { createServerClient } = vi.hoisted(() => ({
  createServerClient: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({ createServerClient }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetAllMocks();
});

test("continues without initializing Supabase when configuration is missing", async () => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");

  const response = await proxy(new NextRequest("http://localhost/"));

  expect(response.headers.get("x-middleware-next")).toBe("1");
  expect(createServerClient).not.toHaveBeenCalled();
});

test("forwards refreshed cookies and preserves cache headers across writes", async () => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "public-test-key");

  const getClaims = vi.fn();
  createServerClient.mockImplementation(
    (_url: string, _key: string, { cookies }: { cookies: CookieMethodsServer }) => {
      getClaims.mockImplementation(async () => {
        expect(await cookies.getAll()).toEqual([{ name: "session", value: "old" }]);
        await cookies.setAll?.(
          [{ name: "session", value: "refreshed", options: { path: "/", secure: true } }],
          {
            "Cache-Control": "private, no-store",
            Expires: "0",
            Pragma: "no-cache",
          },
        );
        await cookies.setAll?.(
          [{ name: "verifier", value: "", options: { path: "/", maxAge: 0 } }],
          {},
        );
      });
      return { auth: { getClaims } };
    },
  );

  const request = new NextRequest("http://localhost/", {
    headers: { cookie: "session=old" },
  });
  const response = await proxy(request);

  expect(getClaims).toHaveBeenCalledOnce();
  expect(response.headers.get("x-middleware-next")).toBe("1");
  expect(response.headers.get("x-middleware-request-cookie")).toContain(
    "session=refreshed",
  );
  expect(response.cookies.get("session")).toMatchObject({
    value: "refreshed",
    path: "/",
    secure: true,
  });
  expect(response.cookies.get("verifier")?.maxAge).toBe(0);
  expect(response.headers.get("cache-control")).toBe("private, no-store");
  expect(response.headers.get("expires")).toBe("0");
  expect(response.headers.get("pragma")).toBe("no-cache");
});
