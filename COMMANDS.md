# NPM Scripts Reference

## Available Commands

### Development

```bash
npm run dev
```
Starts the development server with hot module reloading (HMR).
- Server runs on `http://localhost:3000`
- Auto-reloads when files change
- Shows errors in console and browser
- Best for active development

### Production Build

```bash
npm run build
```
Optimizes the app for production deployment.
- Creates `.next/standalone` directory
- Minifies and bundles code
- Optimizes images and assets
- Ready for Cloudflare Pages

### Production Server

```bash
npm run start
```
Starts the production server (requires `npm run build` first).
- Runs optimized production build
- Server runs on `http://localhost:3000`
- Use this to test production build locally

### Linting

```bash
npm run lint
```
Checks code quality with ESLint.
- Identifies code issues
- Checks style consistency
- Runs on `.ts` and `.tsx` files
- Useful before committing

## Advanced Commands

### Run Dev on Different Port

```bash
npm run dev -- -p 3001
```
Starts dev server on port 3001 instead of 3000.

### Build and Analyze

```bash
npm run build
npm run analyze  # If available
```

### Clean Build

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Format Code (Optional)

```bash
npx prettier --write .
```

## Useful npm Commands (General)

```bash
npm install              # Install dependencies
npm install <package>    # Add new package
npm remove <package>     # Remove package
npm update               # Update all packages
npm list                 # Show installed packages
npm audit                # Check security
npm cache clean --force  # Clear npm cache
```

## TypeScript Checking

```bash
npx tsc --noEmit
```
Checks TypeScript without compiling.

## Deployment

### Cloudflare Pages

```bash
npm run build
wrangler pages deploy .next/standalone
```

### Vercel

```bash
vercel deploy
```

### Docker

```bash
docker build -t mrz-lab .
docker run -p 3000:3000 mrz-lab
```

## Troubleshooting Commands

```bash
# Clear all caches and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build

# Reset to clean state
git clean -fdx
npm install
npm run dev

# Check for issues
npm audit
npm run lint
npx tsc --noEmit
```

## Performance

```bash
# Analyze bundle size
npm run build
bunx analysis  # If installed

# Check build time
npm run build -- --profile
```

## Environment Variables

Create `.env.local` for development:

```env
# No env vars required for this project
# All processing happens client-side
```

## Quick Reference

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run dev` | Start development | http://localhost:3000 |
| `npm run build` | Create production build | `.next/standalone` |
| `npm run start` | Run production build | http://localhost:3000 |
| `npm run lint` | Check code quality | Console output |
| `npm install` | Install dependencies | `node_modules/` |

## Tips

1. **Always run `npm run build` before deploying**
2. **Check `npm audit` after updates for security**
3. **Use `npm run lint` before committing code**
4. **Clear cache if experiencing weird issues**

---

For more information, see the [README.md](README.md)
