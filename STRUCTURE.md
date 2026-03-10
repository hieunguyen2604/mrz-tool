# Project Structure

```
MRZTool/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page component
│
├── components/                  # React components
│   ├── ui/                      # Shadcn UI components
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── textarea.tsx
│   ├── data-table.tsx           # TanStack Table with virtualization
│   ├── download-panel.tsx       # Export functionality
│   ├── mrz-preview.tsx          # OCR-B preview & image generation
│   ├── mrz-validator.tsx        # MRZ validation tool
│   └── upload-zone.tsx          # Drag & drop file upload
│
├── lib/                         # Utility functions
│   ├── mrz-utils.ts            # ICAO MRZ generation & validation
│   ├── utils.ts                # Helper functions (cn)
│   └── validation.ts           # Zod schemas & validation
│
├── public/                      # Static files (if needed)
│
├── package.json                # Dependencies & scripts
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── .eslintrc.json              # ESLint rules
├── .gitignore                  # Git ignore patterns
├── wrangler.toml               # Cloudflare Pages config
├── .env.example                # Environment variables example
├── README.md                   # Main documentation
├── DEPLOYMENT.md               # Cloudflare Pages guide
└── STRUCTURE.md                # This file
```

## File Descriptions

### Core Files

**app/page.tsx**
- Main application component
- State management for data rows
- Layout orchestration of all sections
- React hooks for row management

**components/ui/***
- Reusable shadcn UI components
- Button, Input, Card, Alert, etc.
- Styled with TailwindCSS

**components/upload-zone.tsx**
- Drag & drop file upload handler
- Excel/CSV parsing with SheetJS
- Auto-mapping of columns
- MRZ generation on import

**components/data-table.tsx**
- TanStack Table integration
- Virtualization with TanStack Virtual
- Inline cell editing
- Sorting and filtering
- Add/delete row functionality
- Editable fields with auto-save

**components/mrz-preview.tsx**
- OCR-B font rendering
- MRZ visualization panel
- HTML2canvas image export
- Copy to clipboard functionality
- Data summary display

**components/mrz-validator.tsx**
- Paste MRZ lines input
- ICAO validation checking
- Parsed data display
- Error highlighting

**components/download-panel.tsx**
- Excel export (SheetJS)
- CSV export
- TXT export
- MRZ-only export

**lib/mrz-utils.ts**
- ICAO 9303 TD3 format generation
- Checksum calculation (weights: 7, 3, 1)
- MRZ line formatting
- MRZ validation logic
- Character encoding (A-Z: 10-35, 0-9: numeric, <: 0)

**lib/validation.ts**
- Zod validation schema
- Row validation function
- Error message generation

### Configuration Files

**next.config.js**
- Output format: standalone
- React strict mode enabled
- Optimized for Cloudflare Pages

**tailwind.config.ts**
- OCR-B font family definition
- Dark mode support
- Animation definitions
- Component color scheme

**tsconfig.json**
- Strict mode enabled
- Path aliases (@/*)
- ES2020 target
- JSX React 17

**postcss.config.js**
- Tailwind and Autoprefixer integration

## Data Flow

1. **File Upload**
   - UploadZone receives file
   - SheetJS parses Excel/CSV
   - Columns auto-mapped
   - MRZ generated for each row
   - Data passed to parent via onUpload callback

2. **Row Editing**
   - User clicks cell in DataTable
   - EditableCell component renders input
   - On blur, new MRZ generated
   - Row updated in parent state
   - Table re-renders with new data

3. **MRZ Generation**
   - generateMRZ() called with passport data
   - Checksum calculated using ICAO algorithm
   - Line1 and Line2 formatted
   - Validation errors collected
   - Result for row updates

4. **Data Export**
   - User selects export format
   - DownloadPanel uses appropriate formatter
   - File generated client-side
   - Download triggered to browser
   - File saved locally

5. **MRZ Validation**
   - User pastes MRZ lines
   - validateMRZ() parses both lines
   - Check digits verified
   - Data extracted and displayed
   - Errors highlighted if any

## Performance Considerations

- **Virtualization**: Only visible rows rendered in table
- **Client-side**: All processing happens in browser
- **No API Calls**: Fully static, no server needed
- **Lazy Loading**: Components loaded on demand
- **Image Generation**: html2canvas used locally

## Browser APIs Used

- **FileReader**: File upload handling
- **Clipboard API**: Copy to clipboard
- **Canvas API** (via html2canvas): Image generation
- **Blob & URL.createObjectURL**: File downloads
- **Local State**: React hooks (useState)

## Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^14.0.0 | Framework |
| react | ^18.2.0 | UI library |
| @tanstack/react-table | ^8.11.3 | Data table |
| @tanstack/react-virtual | ^3.0.0 | Row virtualization |
| tailwindcss | ^3.3.0 | Styling |
| zod | ^3.22.4 | Validation |
| xlsx | ^0.18.5 | Excel/CSV |
| html2canvas | ^1.4.1 | Image generation |
| shadcn-ui | ^0.8.0 | UI components |
| lucide-react | ^0.263.1 | Icons |

## Supported File Formats

**Input Files:**
- Excel (.xlsx)
- CSV (.csv, .txt with comma separation)

**Output Formats:**
- Excel (.xlsx)
- CSV (.csv)
- Text (.txt)
- MRZ Lines Only (.txt)

## ICAO 9303 TD3 Format

### MRZ Line 1 (44 chars)
- Positions 1-2: "P<" (passport marker)
- Positions 3-5: Issuer code (3 letters)
- Positions 6-44: Surname << Given name (padded with <)

### MRZ Line 2 (44 chars)
- Positions 1-9: Passport number (9 chars, padded)
- Position 10: Passport check digit
- Positions 11-13: Nationality (3 letters)
- Positions 14-19: Date of birth (YYMMDD)
- Position 20: DOB check digit
- Position 21: Sex (M/F)
- Positions 22-27: Expiry date (YYMMDD)
- Position 28: Expiry check digit
- Position 29: Composite check digit
- Positions 30-44: Filler (< characters)

## Testing Checklist

- [ ] File upload works (Excel & CSV)
- [ ] Data table renders correctly
- [ ] Inline editing updates MRZ
- [ ] Add row creates new entry
- [ ] Delete row removes entry
- [ ] Copy MRZ copies both lines
- [ ] MRZ preview renders correctly
- [ ] Image download works
- [ ] Export Excel works
- [ ] Export CSV works
- [ ] MRZ validator accepts valid data
- [ ] MRZ validator rejects invalid data
- [ ] Virtualization handles 100k+ rows
- [ ] Search/filter works
- [ ] Sorting works

## Future Enhancements

- [ ] Batch MRZ image generation
- [ ] Barcode/QR code generation
- [ ] OCR from image upload
- [ ] Import from camera/scanner
- [ ] Biometric data storage
- [ ] Template saving/loading
- [ ] Multi-language support
- [ ] Dark mode toggle
