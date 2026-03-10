'use client'

import React, { useRef } from 'react'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react'
import { MRZRow } from '@/app/page'
import { generateMRZ } from '@/lib/mrz-utils'

interface UploadZoneProps {
  onUpload: (rows: MRZRow[]) => void
}

const SUPPORTED_COLUMNS = {
  surname: ['surname', 'last name', 'family name'],
  givenName: ['givenname', 'given name', 'first name', 'firstname'],
  passportNumber: ['passport', 'passport number', 'passport#'],
  nationality: ['nationality', 'country', 'nation'],
  issuer: ['issuer', 'country code', 'issue country'],
  dateOfBirth: ['dateofbirth', 'dob', 'date of birth', 'birth date'],
  expiryDate: ['expirydate', 'expiry', 'expiry date', 'exp date', 'expiration'],
  sex: ['sex', 'gender'],
  extraInfo: ['extrainfo', 'optionaldata', 'idnumber', 'extra info'],
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [message, setMessage] = React.useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = (file: File) => {
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows: any[] = XLSX.utils.sheet_to_json(firstSheet)

        if (rows.length === 0) {
          setMessage({ type: 'error', text: 'No data found in file' })
          return
        }

        // Map columns
        const mrzRows: MRZRow[] = rows
          .filter(row => row && Object.values(row).some(v => v))
          .map((row, idx) => {
            const mappedRow: any = {}
            for (const [key, aliases] of Object.entries(SUPPORTED_COLUMNS)) {
              const columnName = Object.keys(row).find(col => {
                const normalizedCol = col.toLowerCase().trim().replace(/\s+/g, '')
                // Normalize aliases too for proper comparison
                return aliases.some(alias => 
                  alias.toLowerCase().trim().replace(/\s+/g, '') === normalizedCol
                )
              })
              if (columnName) {
                mappedRow[key] = String(row[columnName] || '').trim()
              } else {
                mappedRow[key] = ''
              }
            }

            // Generate MRZ
            const mrzData = {
              surname: mappedRow.surname,
              givenName: mappedRow.givenName,
              passportNumber: mappedRow.passportNumber,
              nationality: mappedRow.nationality,
              issuer: mappedRow.issuer,
              dateOfBirth: mappedRow.dateOfBirth,
              expiryDate: mappedRow.expiryDate,
              sex: mappedRow.sex,
              extraInfo: mappedRow.extraInfo,
            }

            const mrz = generateMRZ(mrzData)

            return {
              id: `${Date.now()}-${idx}`,
              ...mappedRow,
              mrzLine1: mrz.line1,
              mrzLine2: mrz.line2,
            }
          })

        onUpload(mrzRows)
        setMessage({
          type: 'success',
          text: `Successfully imported ${mrzRows.length} records`,
        })
      }
      reader.readAsArrayBuffer(file)
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  return (
    <Card className="glass border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Upload className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">Import Dataset</CardTitle>
        </div>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Upload your passport records in Excel or CSV format for real-time MRZ generation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative group border-2 border-dashed rounded-[2rem] p-12 text-center transition-all duration-500 overflow-hidden ${
            isDragging
              ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[0.99]'
              : 'border-slate-200 dark:border-white/10 hover:border-blue-400/50 hover:bg-slate-50/50 dark:hover:bg-white/5'
          }`}
        >
          {/* Animated Glow Background for Dragging */}
          {isDragging && (
            <div className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-tr from-blue-500/10 via-transparent to-indigo-500/10" />
          )}
          
          <div className={`transition-transform duration-500 ${isDragging ? 'scale-110' : ''}`}>
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {isDragging ? 'Drop to start processing' : 'Drop your file here'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Excel (.xlsx) and CSV files are supported
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="default"
              size="lg"
              className="rounded-full px-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
            >
              Browse Local Files
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : message.type === 'success' ? 'success' : 'default'} className="rounded-2xl border-none glass animate-in fade-in slide-in-from-top-2">
            {message.type === 'error' && <AlertCircle className="h-4 w-4" />}
            {message.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            <AlertTitle className="font-bold">
              {message.type === 'error' ? 'Analysis Error' : message.type === 'success' ? 'Import Complete' : 'System Info'}
            </AlertTitle>
            <AlertDescription className="text-sm opacity-90">{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="glass rounded-2xl p-6 border-white/5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Schema Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {['Surname', 'Given Name', 'Passport Number', 'Nationality', 'Issuer', 'Date of Birth (YYMMDD)', 'Expiry Date (YYMMDD)', 'Sex (M/F)', 'Extra Info'].map((col) => (
              <span key={col} className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-white/10">
                {col}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
