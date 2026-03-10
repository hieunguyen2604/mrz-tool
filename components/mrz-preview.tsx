'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Download, AlertCircle, CheckCircle2 } from 'lucide-react'
import { MRZRow } from '@/app/page'
import { validateMRZ } from '@/lib/mrz-utils'

interface MRZPreviewProps {
  row: MRZRow
}

export default function MRZPreview({ row }: MRZPreviewProps) {
  const mrzContainerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const { isValid, errors } = row && row.mrzLine1 && row.mrzLine2
    ? validateMRZ(row.mrzLine1, row.mrzLine2)
    : { isValid: false, errors: ['No MRZ data'] }

  const handleCopyMRZ = () => {
    navigator.clipboard.writeText(`${row.mrzLine1}\n${row.mrzLine2}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadImage = async () => {
    if (!mrzContainerRef.current) return

    try {
      const canvas = await html2canvas(mrzContainerRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `MRZ_${row.passportNumber || 'export'}_${Date.now()}.png`
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }

  if (!row || !row.mrzLine1 || !row.mrzLine2) {
    return (
      <Card className="glass p-8 text-center border-dashed border-2 border-white/10 rounded-2xl">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete passenger details to generate electronic MRZ
        </p>
      </Card>
    )
  }

  return (
    <Card className="glass-card p-6 border-white/5 space-y-6 rounded-[2rem] overflow-hidden relative group">
      {/* Decorative Gold Badge */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 rounded-full blur-2xl group-hover:bg-amber-400/30 transition-colors" />
      
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Live Passport Preview</h3>
        </div>
        {isValid && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500">
            <CheckCircle2 className="h-3 w-3" />
            STANDARDS COMPLIANT
          </div>
        )}
      </div>

      {/* MRZ Card Area (Realistic) */}
      <div
        ref={mrzContainerRef}
        className="relative bg-slate-900 dark:bg-black p-4 py-6 rounded-2xl shadow-2xl border border-white/10"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
        
        <div className="relative font-mono tracking-[0.05em] text-white overflow-hidden text-center">
          <div className="mrz-text text-[clamp(11px,1.25vw,14px)] leading-none mb-2 drop-shadow-md selection:bg-white/20 whitespace-nowrap">{row.mrzLine1}</div>
          <div className="mrz-text text-[clamp(11px,1.25vw,14px)] leading-none drop-shadow-md selection:bg-white/20 whitespace-nowrap">{row.mrzLine2}</div>
        </div>

        {/* Realistic Overlays */}
        <div className="absolute top-1 right-3 text-[7px] font-bold text-white/10 uppercase tracking-widest">ICAO 9303</div>
        <div className="absolute bottom-1.5 left-3 w-6 h-4 rounded border border-white/10 opacity-10" />
      </div>

      {/* Validation Meters */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-3 border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Line 1 Structure</span>
            <span className={`text-[10px] font-bold ${row.mrzLine1?.length === 44 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {row.mrzLine1?.length}/44
            </span>
          </div>
          <div className="h-1 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${row.mrzLine1?.length === 44 ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${Math.min((row.mrzLine1?.length || 0) / 44 * 100, 100)}%` }}
            />
          </div>
        </div>
        <div className="glass rounded-xl p-3 border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Line 2 Structure</span>
            <span className={`text-[10px] font-bold ${row.mrzLine2?.length === 44 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {row.mrzLine2?.length}/44
            </span>
          </div>
          <div className="h-1 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${row.mrzLine2?.length === 44 ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${Math.min((row.mrzLine2?.length || 0) / 44 * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error Feedback */}
      {!isValid && errors.length > 0 && (
        <Alert variant="destructive" className="rounded-xl border-none bg-rose-500/10 text-rose-500">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-[11px] font-medium leading-tight">
            Structure Mismatch: {errors[0]}
          </AlertDescription>
        </Alert>
      )}

      {/* Primary Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleCopyMRZ}
          className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 border-none gap-2 text-xs font-bold transition-all hover:scale-[1.02]"
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Copied to Clipboard' : 'Copy Full MRZ'}
        </Button>
        <Button
          onClick={handleDownloadImage}
          variant="outline"
          className="w-14 h-11 rounded-xl glass border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
          title="Download as high-res PNG"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Metadata Detail */}
      <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-y-3">
        <div className="space-y-0.5">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Passport ID</div>
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{row.passportNumber || 'N/A'}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Issuer Code</div>
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{row.issuer || 'N/A'}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Nationality</div>
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{row.nationality || 'N/A'}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Gender</div>
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{row.sex === 'M' ? 'Male (M)' : row.sex === 'F' ? 'Female (F)' : 'N/A'}</div>
        </div>
      </div>
    </Card>
  )
}
