# Getting Started Guide

Welcome to the MRZ Lab Tool! This guide will help you get up and running quickly.

## Prerequisites

Before you start, make sure you have:

- **Node.js** 18 or higher ([Download](https://nodejs.org))
- **npm** 9 or higher (comes with Node.js)
- **Git** for version control (optional but recommended)
- A code editor (VS Code recommended)

Verify your installation:

```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 9.0.0 or higher
```

## Installation

### Step 1: Clone or Download the Project

```bash
cd /path/to/MRZTool
```

### Step 2: Install Dependencies

```bash
npm install
```

This will download and install all required packages (~500MB).

### Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 4: Open in Browser

Navigate to **http://localhost:3000** in your web browser.

## Your First Passports

### Create Sample Data

1. **Click "Add Row"** to add a new record
2. **Fill in the fields**:
   - Surname: `NOWATKA`
   - Given Name: `DIANN`
   - Passport Number: `5432636878`
   - Nationality: `USA`
   - Issuer: `USA`
   - Date of Birth: `901114` (Nov 14, 1990)
   - Expiry Date: `261016` (Oct 16, 2026)
   - Sex: `F`

3. **Watch the magic** - MRZ lines generate automatically!
4. **View the preview** on the right side

### Import from Excel

Create a spreadsheet with these columns:
```
Surname | Given Name | Passport Number | Nationality | Issuer | Date of Birth | Expiry Date | Sex
OBAMA   | BARACK    | AB123456       | USA         | USA    | 610408        | 351221      | M
```

Then:
1. Save as `.xlsx` or `.csv`
2. Drag & drop onto the upload area
3. All records import with MRZ auto-generated

## Common Tasks

### Copy MRZ to Clipboard

```
1. Click the 📋 icon in the Actions column
2. MRZ lines are copied automatically
3. Paste anywhere you need them
```

### Export Your Data

```
1. Click "Download Excel" for structured data
2. Click "Download CSV" for spreadsheet import
3. Click "Download TXT" for plain text
4. Click "Download MRZ Only" for just the MRZ lines
```

### Validate MRZ Lines

```
1. Go to "MRZ Validator" section (bottom)
2. Paste two MRZ lines:
   P<USANOWATKA<<DIANN<<<<<<<<<<<<<<<<<<
   5432636878USA9011148F2610162<<<<<<<<<
3. Click "Validate MRZ"
4. See validation results
```

### Download MRZ Image

```
1. Select a row by clicking "View"
2. In the preview panel, click "Download Image"
3. PNG file saves to your downloads folder
4. Image shows MRZ in OCR-B font
```

## Features Walkthrough

### 📤 Import Panel
- Supports Excel (`.xlsx`) and CSV files
- Auto-detects column headers (case-insensitive)
- Generates MRZ for each record on import

### 📊 Data Table
- Up to 100,000+ rows with smooth scrolling
- Click any cell to edit inline
- Click headers to sort
- Use search box to filter
- Add rows with "+ Add Row" button
- Delete with trash icon

### 🔹 MRZ Preview Panel
- Shows MRZ in OCR-B font
- Copy both lines with one click
- Download MRZ as PNG image
- View parsed passport data

### ✅ Validator Tool
- Paste any MRZ lines for validation
- Checks all ICAO 9303 TD3 rules
- Verifies check digits
- Shows parsed data on success
- Lists errors on validation failure

### 💾 Download Panel
- Export to Excel for spreadsheets
- Export to CSV for data analysis
- Export to TXT for text files
- Export MRZ lines only
- All processing happens locally

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Alt+A` | Add row (on macOS: `Cmd+A`) |
| `Enter` | Save cell edit |
| `Esc` | Cancel cell edit |
| `Ctrl+F` | Search table (browser feature) |

## Tips & Tricks

### ⚡ Speed Tips
- Use Excel import for large datasets (faster than manual entry)
- Use search to quickly find specific records
- Sort by passport number for quick lookups

### 🔒 Data Privacy
- **All data stays local** - nothing uploads to servers
- No tracking or analytics enabled
- Safe for sensitive passport data
- Works offline after initial load

### 📱 On Different Devices
- Works on desktop, tablet, and mobile
- Table scrolls horizontally on small screens
- Upload works on all browsers
- Export downloads to local device

### 🎨 Customization
- Table columns are sortable
- Search filters all columns
- Dark mode: Browser system preference
- Font sizes scale to viewport

## Troubleshooting

### "Module not found" Error

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Table Not Showing Data

1. Check browser console (F12 → Console tab)
2. Verify file has correct headers
3. Try exporting and re-importing
4. Check that dates are in YYMMDD format

### MRZ Not Generating

Ensure all required fields are filled:
- ✓ Surname (required)
- ✓ Given Name (required)  
- ✓ Passport Number (6-9 chars, alphanumeric)
- ✓ Nationality (3 letters)
- ✓ Issuer (3 letters)
- ✓ Date of Birth (YYMMDD)
- ✓ Expiry Date (YYMMDD)
- ✓ Sex (M or F)

### Download Not Working

1. Check browser pop-up blocker
2. Allow downloads in browser settings
3. Check disk space available
4. Try a different browser
5. Check browser console for errors

### Performance Issues with Many Rows

- Table is virtualized (only visible rows render)
- Can handle 100k+ rows smoothly
- If slow, close other browser tabs
- Restart the dev server: `npm run dev`

## Configuration

### Change Port

```bash
npm run dev -- -p 3001
```

Server will run on port 3001 instead of 3000.

### Build for Production

```bash
npm run build
npm run start
```

App runs standalone (optimized for deployment).

### Deploy to Cloudflare Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Next Steps

1. **Import your data** - Try uploading a spreadsheet
2. **Explore features** - Test export, validation, image download
3. **Learn MRZ format** - Read about ICAO 9303 TD3 in README.md
4. **Deploy** - Follow DEPLOYMENT.md to go live

## Getting Help

- **Read the README.md** - Full feature documentation
- **Check STRUCTURE.md** - Technical architecture
- **Review DEPLOYMENT.md** - Cloudflare deployment guide
- **Console logs** - Browser DevTools (F12) for errors

## What's Next?

### Local Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Check code quality
```

### Production Ready
- App is fully client-side (no backend needed)
- All data processing happens locally
- All exports work without server
- Ready for Cloudflare Pages, Vercel, or any static host

## FAQ

**Q: Is my data secure?**
A: Yes! All data stays on your computer. Nothing is sent to servers.

**Q: Can I use this offline?**
A: Yes, after the initial load. File upload works offline too.

**Q: How many rows can the table handle?**
A: Tested up to 100,000+ rows with smooth performance.

**Q: Can I use this on my phone?**
A: Yes! It's responsive and works on mobile browsers.

**Q: How do I get the OCR font to work?**
A: It's loaded automatically from a CDN with fallback to monospace.

**Q: Can I customize column names?**
A: In code, edit `SUPPORTED_COLUMNS` in `components/upload-zone.tsx`

---

**Happy MRZ Testing! 🚀**

For more information, see the [README.md](README.md)
