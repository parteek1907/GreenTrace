# Deployment Guide

GreenTrace is optimized for Vercel, though it can be deployed to any Node.js environment supporting Next.js.

## Vercel Deployment (Recommended)
1. Fork or clone the repository to your GitHub account.
2. Link the repository in the Vercel Dashboard.
3. Configure the following Environment Variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Vercel automatically detects Next.js and builds the project.

## Docker Deployment (Alternative)
To deploy via Docker:
1. Build the image: `docker build -t greentrace .`
2. Run the container: `docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... greentrace`

## Continuous Integration
Husky and lint-staged ensure that broken code is not committed. For CI/CD, we recommend adding a GitHub Action to run `npm run test` before allowing merges to the main branch.
