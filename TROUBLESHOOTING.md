# Troubleshooting Guide

## Installation Issues

### "npm: command not found"

**Problem**: Node.js/npm not installed

**Solution**:
1. Download Node.js from https://nodejs.org
2. Install the LTS version
3. Verify: `node --version` and `npm --version`
4. Restart terminal

### "Cannot find module" Error

**Problem**: Dependencies not fully installed

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Permission denied" on npm

**Solution**:
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

## Development Issues

### Dev server won't start

**Problem**: Port 3000 already in use or permission error

**Solution**:
```bash
# Try different port
npm run dev -- -p 3001

# Or kill process on port 3000 (macOS/Linux)
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "EADDRINUSE" error

**Problem**: Another app is using the port

**Solution**:
```bash
# Kill all Node processes
killall node

# Or restart
npm run dev -- -p 3000
```

### Hot reload not working

**Problem**: File changes not updating browser

**Solution**:
1. Refresh browser (Cmd+R or Ctrl+R)
2. Clear cache: Cmd+Shift+R or Ctrl+Shift+R
3. Restart dev server: `npm run dev`
4. Check file is saved

### "ENOSPC" Storage error

**Problem**: Low disk space

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and rebuild
rm -rf node_modules
npm install
```

## Build Issues

### Build fails with "out of memory"

**Problem**: Node.js heap size exceeded

**Solution**:
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build

# Or on Windows
set NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### "Module not found" during build

**Problem**: Missing dependency

**Solution**:
```bash
npm install
npm run build
```

### Build takes too long

**Problem**: Large project or slow machine

**Solution**:
```bash
# Clean and retry
rm -rf .next
npm run build

# Use SSD for better performance
```

## Runtime Issues

### Table not showing data

**Cause** | **Solution**
---------|------------
Empty file | Check CSV/Excel has data
Wrong headers | Column names must match expected ones
Bad encoding | Re-save file as UTF-8
Validation errors | Check date format (YYMMDD)

### MRZ not generating

**Checklist**:
- [ ] Surname filled in
- [ ] Given Name filled in
- [ ] Passport Number filled in (6-9 alphanumeric)
- [ ] Nationality filled in (must be 3 letters)
- [ ] Issuer filled in (must be 3 letters)
- [ ] Date of Birth filled in (format: YYMMDD)
- [ ] Expiry Date filled in (format: YYMMDD)
- [ ] Sex filled in (M or F)

### All fields red/invalid

**Solutions**:
1. Clear field and re-enter carefully
2. Check date format: must be YYMMDD (e.g., 901114)
3. Verify field lengths match requirements
4. Check for extra spaces

### Copy not working

**Problem**: Clipboard access denied

**Solutions**:
1. Use Firefox or Chrome (better clipboard support)
2. Check browser permissions (chrome://settings/content/clipboard)
3. Try manual selection (Cmd+C on Mac, Ctrl+C on Windows)

### Download not working

**Problem**: File not saving

**Solutions**:
1. Check browser pop-up/download blocker
2. Verify disk space available
3. Try different browser
4. Check browser settings (Downloads folder)
5. Disable pop-up blocker for this site

### Validator says "Invalid MRZ"

**Possible causes**:
- [ ] Not 44 characters per line
- [ ] Wrong check digits
- [ ] Invalid character encoding
- [ ] Wrong format

**Fix**: Copy valid MRZ lines:
```
P<USANOWATKA<<DIANN<<<<<<<<<<<<<<<<<<
5432636878USA9011148F2610162<<<<<<<<<
```

## Performance Issues

### Table scrolling is slow

**Solutions**:
1. Close other browser tabs
2. Reduce number of visible columns
3. Use Chrome (better virtualization support)
4. Restart browser
5. Check Task Manager (Windows) or Activity Monitor (Mac)

### Large file upload hangs

**Solutions**:
```bash
# Try smaller file first
(up to 50MB should work)

# If still slow:
# 1. Check file encoding (must be UTF-8)
# 2. Try Excel instead of CSV
# 3. Close other apps to free memory
```

### High memory usage

**Cause**: Too many rows causing memory leak

**Solution**:
1. Reduce dataset size
2. Restart browser
3. Export data and clear table
4. Use smaller batches

## Data Issues

### Data disappeared

**Problem**: Lost work

**Solutions**:
- Data is only in memory (not saved)
- Use Export to save regularly
- Consider exporting often

### Wrong data imported

**Problem**: Columns mapped incorrectly

**Solution**:
1. Check file column headers match expected names
2. If not matching, edit headers before upload
3. Try CSV instead of Excel or vice versa

### Corrupted file error

**Problem**: File unreadable

**Solutions**:
1. Check file not corrupted: try opening in Excel/Sheets
2. Re-save as proper format (Excel or UTF-8 CSV)
3. Try with sample-data.csv first
4. Use different file encoding if available

## Browser Issues

### White blank page

**Problem**: App won't load

**Solutions**:
1. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
2. Check browser console (F12) for errors
3. Try incognito window
4. Try different browser
5. Restart browser

### Fonts not loading

**Problem**: OCR-B font not rendering

**Solution**:
1. Check internet connection (font loads from CDN)
2. Disable ad blocker
3. Check browser DevTools (F12 → Network tab)
4. Fallback monospace font will be used if CDN fails

### React errors in console

**Problem**: JavaScript crash

**Solutions**:
1. Open browser console (F12 → Console tab)
2. Note the error message
3. Restart dev server
4. Check file was saved correctly

## Browser-Specific Issues

### Safari not working properly

**Solution**:
- Update Safari to latest version
- Disable tracking prevention temporarily
- Try Chrome instead if persistent

### Firefox performance issues

**Solution**:
- Disable extensions
- Clear cache
- Update to latest version

### Edge compatibility

**Solution**:
- Edge is Chromium-based, should work fine
- Update to latest version

## Deployment Issues

### Cloudflare Pages deployment fails

**Solutions**:
1. Check build completes locally: `npm run build`
2. Verify `.next/standalone` directory exists
3. Check wrangler is installed: `npm install -g wrangler`
4. Authenticate: `wrangler login`
5. Check project name in wrangler.toml

### Vercel deployment fails

**Solutions**:
1. Push to GitHub first
2. Connect to Vercel via dashboard
3. Vercel auto-detects Next.js
4. Check build logs for errors

## Getting More Help

1. **Browser Console** (F12)
   - Detailed error messages
   - Stack traces
   - Network requests

2. **Terminal Output**
   - Build errors
   - Server errors
   - Type checking

3. **Check Files**
   - README.md - Features & usage
   - GETTING_STARTED.md - Setup guide
   - STRUCTURE.md - Architecture

4. **Sample Testing**
   - Use sample-data.csv for testing
   - Test with small datasets first
   - Isolate variables

## Quick Fixes Checklist

- [ ] Restart terminal/IDE
- [ ] Restart dev server: `npm run dev`
- [ ] Clear cache: `npm cache clean --force`
- [ ] Reinstall: `rm -rf node_modules && npm install`
- [ ] Clean build: `rm -rf .next && npm run build`
- [ ] Restart browser
- [ ] Try incognito/private window
- [ ] Check browser console (F12)
- [ ] Check terminal for errors
- [ ] Verify Node version: `node --version`

## Still Stuck?

1. Check if issue is documented above
2. Read the relevant .md file (README, STRUCTURE, etc)
3. Search browser console for error message
4. Try with sample-data.csv
5. Check GitHub for similar issues

---

**Pro Tip**: Keep browser DevTools open (F12) while troubleshooting to catch errors early!
