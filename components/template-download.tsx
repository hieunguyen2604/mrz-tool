'use client'

import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const TEMPLATE_DATA = [
  {
    Surname: 'NOWATKA',
    GivenName: 'DIANN',
    PassportNumber: 'AB123456',
    Nationality: 'USA',
    Issuer: 'USA',
    DateOfBirth: '901114',
    ExpiryDate: '261016',
    Sex: 'F',
    ExtraInfo: '123456789',
  },
]

export default function TemplateDownload() {
  const downloadTemplate = (type: 'xlsx' | 'csv') => {
    const worksheet = XLSX.utils.json_to_sheet(TEMPLATE_DATA)
    
    // Force all cells to be strings to prevent Excel auto-formatting
    Object.keys(worksheet).forEach(key => {
      if (key.startsWith('!')) return
      const cell = worksheet[key]
      if (cell && typeof cell === 'object') {
        cell.t = 's'
        cell.z = '@'
      }
    })

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template')

    if (type === 'xlsx') {
      XLSX.writeFile(workbook, 'mrz_template.xlsx')
    } else {
      const csv = XLSX.utils.sheet_to_csv(worksheet, { forceQuotes: true })
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'mrz_template.csv'
      link.click()
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => downloadTemplate('xlsx')}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Template (Excel)
      </Button>
      <Button
        onClick={() => downloadTemplate('csv')}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Template (CSV)
      </Button>
    </div>
  )
}
