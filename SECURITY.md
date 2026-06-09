# Security Model

This document outlines the security architecture and measures implemented in GreenTrace.

## Threat Model

1. **Cross-Site Scripting (XSS)**
   - **Mitigation:** We rely on React's auto-escaping for DOM rendering. For database inputs, we utilize `src/utils/sanitization.ts` to escape hazardous characters. Our Content-Security-Policy (CSP) in `next.config.ts` prevents inline scripts (`unsafe-inline`) where possible and strictly limits sources.

2. **Cross-Site Request Forgery (CSRF)**
   - **Mitigation:** Supabase auth uses secure cookies with `SameSite=Lax`. We do not rely solely on cookies for state mutation endpoints (using Authorization headers or server actions).

3. **Data Injection / Parameter Tampering**
   - **Mitigation:** All incoming request data (forms, API payloads, query params) are rigorously validated using Zod schemas (`src/utils/validation.ts`). Strict typing ensures no unexpected payloads bypass business logic.

4. **Clickjacking**
   - **Mitigation:** `X-Frame-Options` is set to `SAMEORIGIN` in the Next.js header configuration.

5. **Rate Limiting & Abuse**
   - **Mitigation:** Supabase inherently provides rate limiting on authentication endpoints. Additional application-level rate-limiting can be implemented via middleware if traffic scales.

## Data Handling & Privacy
- Personally Identifiable Information (PII) like emails are stored securely in Supabase Auth.
- Carbon twin data is anonymized when participating in community challenges.
- All data in transit is encrypted via HTTPS (enforced via `Strict-Transport-Security` headers).

## Security Headers Implemented
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`
- `Strict-Transport-Security`
- `Referrer-Policy`
