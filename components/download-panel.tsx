'use client'

import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download } from 'lucide-react'
import { MRZRow } from '@/app/page'

interface DownloadPanelProps {
  rows: MRZRow[]
}

export default function DownloadPanel({ rows }: DownloadPanelProps) {
  const getExportData = () => {
    return rows.map(({ mrzLine1, mrzLine2, ...rest }) => ({
      ...rest,
      MRZ: `${mrzLine1}\n${mrzLine2}`
    }))
  }

  const downloadExcel = () => {
    if (rows.length === 0) return

    const exportData = getExportData()
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'MRZ Data')
    XLSX.writeFile(workbook, 'mrz_results.xlsx')
  }

  const downloadCSV = () => {
    if (rows.length === 0) return

    const exportData = getExportData()
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const csv = XLSX.utils.sheet_to_csv(worksheet)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'mrz_results.csv'
    link.click()
  }

  const downloadMRZOnly = () => {
    if (rows.length === 0) return

    let content = ''
    rows.forEach((row) => {
      content += `${row.mrzLine1}\n${row.mrzLine2}\n\n`
    })

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'mrz_lines.txt'
    link.click()
  }

  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Export ({rows.length} rows)</h3>
      
      <div className="space-y-1.5">
        <Button
          onClick={downloadExcel}
          size="sm"
          variant="outline"
          className="w-full gap-1 h-8 text-xs"
          disabled={rows.length === 0}
        >
          <Download className="h-3 w-3" />
          Excel
        </Button>
        <Button
          onClick={downloadCSV}
          size="sm"
          variant="outline"
          className="w-full gap-1 h-8 text-xs"
          disabled={rows.length === 0}
        >
          <Download className="h-3 w-3" />
          CSV
        </Button>
        <Button
          onClick={downloadMRZOnly}
          size="sm"
          variant="outline"
          className="w-full gap-1 h-8 text-xs"
          disabled={rows.length === 0}
        >
          <Download className="h-3 w-3" />
          MRZ Lines
        </Button>
      </div>
    </Card>
  )
}
