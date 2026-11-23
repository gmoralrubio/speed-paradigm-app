import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig } from "./config";

export async function updateSession(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) return NextResponse.next();

  const responseCookies: Parameters<SetAllCookies>[0] = [];
  const responseHeaders = new Headers();
  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const cookie of cookiesToSet) {
          request.cookies.set(cookie.name, cookie.value);
          responseCookies.push(cookie);
        }

        // Supabase supplies cache headers only on the first write.
        for (const [name, value] of Object.entries(headers)) {
          responseHeaders.set(name, value);
        }
      },
    },
  });

  await supabase.auth.getClaims();

  const response = NextResponse.next({ request, headers: responseHeaders });
  for (const { name, value, options } of responseCookies) {
    response.cookies.set(name, value, options);
  }

  return response;
}
