# Cloudflare Pages Deployment Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)

## Deployment Steps

### 1. Build the Project

```bash
npm install
npm run build
```

This creates a `.next/standalone` directory optimized for server-side rendering.

### 2. Deploy to Cloudflare Pages

#### Option A: Using Wrangler CLI

```bash
# Login to Cloudflare
wrangler login

# Deploy the standalone build
wrangler pages deploy .next/standalone
```

#### Option B: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project**
4. Connect your Git repository (GitHub/GitLab)
5. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next/standalone`
6. Click **Save and Deploy**

#### Option C: Direct Upload

```bash
# Build locally
npm run build

# Deploy using wrangler
wrangler pages deploy .next/standalone --project-name mrz-lab-tool
```

### 3. Configure Cloudflare Pages

1. **Redirects & Rewrites**: Cloudflare Pages automatically handles Next.js rewrites
2. **Environment Variables**: None required (fully client-side)
3. **Custom Domain**: In **Pages** settings, add your custom domain

## Features Preserved on Cloudflare Pages

✅ All client-side functionality works perfectly  
✅ No server API calls needed  
✅ File uploads work directly in browser  
✅ Excel/CSV parsing via SheetJS  
✅ Image generation via html2canvas  
✅ All downloads function correctly  

## Performance Notes

- **Global Distribution**: Automatically cached and served from edge locations
- **Zero Cold Starts**: Static site generation
- **Fast Deployment**: Updates deploy in seconds
- **Unlimited Bandwidth**: Within fair use limits

## Troubleshooting

### Build fails with "Cannot find module"

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Pages shows "Cannot GET /"

1. Ensure you deployed the correct directory (`.next/standalone`)
2. Check that build completed successfully in Cloudflare logs

### Download functionality not working

- Check browser console for CORS errors
- Verify files are being generated in client-side code
- Ensure no Content Security Policy restrictions

### Redirects not working

Cloudflare Pages handles Next.js routing automatically, but if issues persist:

1. Add `_redirects` file in `.next/standalone/public/`
2. Or configure in Cloudflare Pages **Rules & Redirects**

## Monitoring

- View deployment logs in **Pages** settings
- Check analytics in **Analytics** tab
- Monitor errors in **Build log**

## Rollback

To rollback to previous deployment:

1. Go to **Deployments**
2. Find previous successful build
3. Click **Rollback to this deployment**

## Environment-Specific Builds

For development builds:

```bash
npm run dev
```

For staging on Cloudflare:

```bash
npm run build
wrangler pages deploy .next/standalone --project-name mrz-lab-tool-staging
```

## File Size Limits

Cloudflare Pages has a 100MB limit per deployment. Your MRZ Lab Tool is well under this limit.

## Getting Help

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/cli-wrangler/)
