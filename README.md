# MRZ Lab Tool

A professional, modern web application for MRZ (Machine Readable Zone) testing and validation, built for laboratory and OCR environments.

## Features

✅ **Drag & Drop Import** - Import Excel (.xlsx) or CSV files  
✅ **Editable Data Table** - Inline editing with real-time validation (supports 100k+ rows)  
✅ **Real-time MRZ Generation** - Automatic ICAO 9303 TD3 format generation  
✅ **MRZ Checksum Validation** - Official ICAO checksum algorithm  
✅ **OCR-B Font Rendering** - Authentic MRZ preview with OCR-B font  
✅ **MRZ Image Export** - Generate PNG images of MRZ  
✅ **Copy to Clipboard** - Quick copy of MRZ lines  
✅ **Multiple Export Formats** - Excel, CSV, and TXT downloads  
✅ **MRZ Validator Tool** - Paste and validate arbitrary MRZ lines  
✅ **Professional Lab UI** - Clean, modern interface designed for productivity  
✅ **Cloudflare Pages Ready** - Optimized for edge deployment  

## Technology Stack

- **Next.js 14** (App Router)
- **TypeScript** - Full type safety
- **TailwindCSS** - Utility-first styling
- **Shadcn UI** - Beautiful component library
- **TanStack Table** - Powerful data table with sorting/filtering
- **TanStack Virtual** - Efficient virtualization for large datasets
- **SheetJS (xlsx)** - Excel/CSV parsing
- **Zod** - Runtime validation schema
- **html2canvas** - MRZ image generation

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to project directory
cd MRZTool

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Deployment to Cloudflare Pages

```bash
npm run build

# Deploy the .next/standalone directory
wrangler pages deploy .next/standalone
```

## Usage Guide

### 1. Import Data

1. **Drag & Drop**: Drag an Excel or CSV file onto the upload area
2. **Click to Browse**: Or click the "Browse Files" button
3. **Auto-mapping**: Columns are automatically matched and mapped
4. **Validation**: Data is validated and MRZ is generated on import

**Required Columns:**
- Surname
- Given Name
- Passport Number
- Nationality (3 letters)
- Issuer (3 letters)
- Date of Birth (YYMMDD)
- Expiry Date (YYMMDD)
- Sex (M or F)

### 2. Edit Data

- **Click any cell** to edit inline
- **Add Row**: Click "Add Row" to create new entries
- **Delete Row**: Use the trash icon to remove rows
- **Copy MRZ**: Click the copy icon to copy both MRZ lines
- **Sorting**: Click column headers to sort
- **Search**: Use the search box to filter all columns

### 3. MRZ Preview

- Real-time MRZ rendering with OCR-B font
- Preview uses ICAO 9303 TD3 format
- **Copy MRZ**: Copy both lines to clipboard
- **Download Image**: Generate PNG image of MRZ area

### 4. Export Results

- **Excel (.xlsx)**: Structured data with all columns
- **CSV**: Plain text comma-separated values
- **TXT**: Formatted text with metadata
- **MRZ Only**: Text file with just MRZ lines

### 5. Validate MRZ

1. Paste MRZ lines (2 lines exactly)
2. Click "Validate MRZ"
3. System checks:
   - Format compliance
   - Check digits (ICAO algorithm)
   - Character encoding
4. View parsed data or validation errors

## MRZ Format (ICAO 9303 TD3)

### Line 1 (44 chars)
```
P<[ISSUER][SURNAME]<<[GIVENNAME]<<<<<<<<<<<<<<<<<
```

### Line 2 (44 chars)
```
[PASSPORT#][CHECK1][NATIONALITY][DOB][CHECK2][SEX][EXPIRY][CHECK3][COMPOSITE]
```

## API & Components

### Main Components

- **UploadZone** - File upload with drag-drop
- **DataTable** - Virtualized table with inline editing (TanStack Table)
- **MRZPreview** - OCR-B rendering and image export
- **MRZValidator** - Paste & validate MRZ lines
- **DownloadPanel** - Export functionality

### Utilities

#### `lib/mrz-utils.ts`
- `generateMRZ(data)` - Create MRZ from passport data
- `validateMRZ(line1, line2)` - Validate MRZ lines
- `calculateChecksum(input)` - ICAO checksum algorithm
- `formatDateToYYMMDD(date)` - Date formatting

#### `lib/validation.ts`
- `MRZRowSchema` - Zod validation schema
- `validateRow(row)` - Validate single row

## Performance

- **Large Datasets**: Handles 100k+ rows smoothly with TanStack Virtual
- **Client-side Processing**: All MRZ generation runs in browser
- **Optimized Rendering**: Virtualization only renders visible rows
- **Zero Server Calls**: Fully static, no backend required

## Configuration

### Environment Variables

```env
# Optional - for Cloudflare Pages
```

No environment variables are required. App is fully client-side.

### Tailwind Customization

Edit `tailwind.config.ts` to modify colors, fonts, and spacing.

## Troubleshooting

### Table not showing data
- Check that file has correct column headers
- Verify data is not empty
- Check browser console for errors

### MRZ generation fails
- Ensure all required fields are filled
- Check date format (YYMMDD)
- Verify gender is M or F

### Images not downloading
- Check pop-up blocker settings
- Ensure browser allows downloads
- Check available disk space

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or feature requests, please create an issue in the repository.

## Contributing

Contributions welcome! Please submit pull requests with improvements.

---

**Built with ❤️ for OCR and airport lab environments**
