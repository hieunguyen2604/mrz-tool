'use client'

import { useState } from 'react'
import UploadZone from '@/components/upload-zone'
import MRZPreview from '@/components/mrz-preview'
import MRZValidator from '@/components/mrz-validator'
import DownloadPanel from '@/components/download-panel'
import TemplateDownload from '@/components/template-download'
import { Button } from '@/components/ui/button'
import { Plus, User, ArrowUp } from 'lucide-react'
import PassengerDetailForm from '@/components/passenger-form'

export interface MRZRow {
  id: string
  surname: string
  givenName: string
  passportNumber: string
  nationality: string
  issuer: string
  dateOfBirth: string
  expiryDate: string
  sex: string
  extraInfo: string
  mrzLine1: string
  mrzLine2: string
}

export default function Home() {
  const [rows, setRows] = useState<MRZRow[]>([])

  const addRow = () => {
    const newRow: MRZRow = {
      id: Date.now().toString(),
      surname: '',
      givenName: '',
      passportNumber: '',
      nationality: '',
      issuer: '',
      dateOfBirth: '',
      expiryDate: '',
      sex: 'M',
      extraInfo: '',
      mrzLine1: '',
      mrzLine2: '',
    }
    setRows([...rows, newRow])
  }

  const deleteRow = (id: string) => {
    setRows(prev => prev.filter(row => row.id !== id))
  }
  const updateRow = (updatedRow: MRZRow) => {
    setRows(rows.map(row => row.id === updatedRow.id ? updatedRow : row))
  }

  const duplicateRow = (row: MRZRow) => {
    const newRow = { ...row, id: Date.now().toString() }
    setRows([...rows, newRow])
  }

  const handleUpload = (uploadedRows: MRZRow[]) => {
    setRows(uploadedRows)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500/30">
      {/* Premium Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 subtle-mesh opacity-40 dark:opacity-70" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                  MRZ Lab Tool <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20 align-middle ml-1">v1.2.1</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-slate-400">
                  ICAO 9303 TD3 Standard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-full text-xs font-medium border-white/20">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                <span className="text-slate-700 dark:text-slate-300">{rows.length} records loaded</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="space-y-10">
          {/* Section 1: Upload */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">1</div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
                Import Source Data
              </h2>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden p-1">
              <UploadZone onUpload={handleUpload} />
            </div>
          </section>

          {/* Section 2: Global Utilities */}
          <section className="glass rounded-2xl border-white/10 p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">2</div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest text-center">
                Global Utilities
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <TemplateDownload />
              <Button size="sm" variant="default" onClick={addRow} className="gap-1.5 shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add New Record
              </Button>
              <DownloadPanel rows={rows} />
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setRows([])} 
                className="h-9 px-3 border-rose-500/20 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all font-bold text-xs"
              >
                Clear Workspace
              </Button>
            </div>
          </section>

          {/* Section 3: Continuous Profile Feed */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">3</div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
                Profile Laboratory Feed
              </h2>
            </div>
            
            <div className="space-y-16">
              {rows.length > 0 ? (
                <>
                  {rows.map((row, index) => (
                    <div key={row.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {/* Form Column */}
                      <div className="lg:col-span-7 xl:col-span-8">
                        <PassengerDetailForm 
                          row={row} 
                          index={index}
                          onUpdate={updateRow} 
                          onDelete={deleteRow}
                          onDuplicate={duplicateRow}
                        />
                      </div>

                      {/* Preview Column */}
                      <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
                        <MRZPreview row={row} />
                      </div>
                    </div>
                  ))}
                  
                  {/* Bottom Add Shortcut */}
                  <div className="pt-8 border-t border-dashed border-white/10 flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={addRow} 
                      className="glass border-white/10 h-24 w-full max-w-2xl rounded-[2rem] border-dashed border-2 hover:bg-white/5 hover:border-blue-500/50 transition-all font-bold text-slate-500 hover:text-blue-500 flex flex-col gap-2"
                    >
                      <Plus className="h-6 w-6" />
                      Add Another Profile
                    </Button>
                  </div>
                </>
              ) : (
                <div className="glass-card rounded-[2.5rem] p-32 text-center space-y-8 border-dashed border-2 border-white/10">
                  <div className="w-24 h-24 bg-blue-500/5 rounded-full flex items-center justify-center mx-auto ring-[16px] ring-blue-500/5">
                    <User className="h-12 w-12 text-blue-500/40" />
                  </div>
                  <div className="max-w-md mx-auto">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Feed is Empty</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                      Initialize your workspace by importing a batch file or creating a manual entry.
                    </p>
                  </div>
                  <Button onClick={addRow} className="bg-blue-600 hover:bg-blue-700 text-white rounded-[1.25rem] px-10 h-14 font-bold shadow-2xl shadow-blue-500/20 text-base hover:scale-105 transition-transform">
                    Initialize Workspace
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Section 4: Validation */}
          <section className="space-y-4 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-sm">4</div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
                Advanced Validator
              </h2>
            </div>
            <div className="glass-card rounded-2xl p-1">
              <MRZValidator />
            </div>
          </section>
        </div>

        {/* Floating Actions */}
        {rows.length > 2 && (
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl shadow-blue-500/20 hover:scale-110 transition-transform z-50 p-0 flex items-center justify-center border-none"
            title="Scroll to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-lg font-bold">MRZ Lab Tool</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                A high-precision utility for security professionals and OCR developers.
                Built for performance, data privacy, and compliance with ICAO 9303 standards.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Core Standards</h3>
              <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-2">
                <li>• ICAO Doc 9303 TD3</li>
                <li>• OCR-B Character Set</li>
                <li>• 7-3-1 Weighting Algorithm</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Privacy</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                All data is processed locally in your browser. No information is transmitted to any server.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © 2024 MRZ Lab • Professional Edition
            </p>
            <div className="flex gap-4">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">v1.2.1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
