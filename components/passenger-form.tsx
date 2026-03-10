import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MRZRow } from '@/app/page'
import { generateMRZ } from '@/lib/mrz-utils'
import { User, Info, Copy, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PassengerDetailFormProps {
  row: MRZRow
  index: number
  onUpdate: (updatedRow: MRZRow) => void
  onDelete: (id: string) => void
  onDuplicate: (row: MRZRow) => void
}

export default function PassengerDetailForm({ 
  row, 
  index,
  onUpdate,
  onDelete,
  onDuplicate
}: PassengerDetailFormProps) {
  const [formData, setFormData] = useState<MRZRow>(row)

  useEffect(() => {
    setFormData(row)
  }, [row])

  const handleChange = (field: keyof MRZRow, value: string) => {
    const updated = { ...formData, [field]: value }
    
    // Auto-recalculate MRZ on any change
    const mrz = generateMRZ({
      surname: updated.surname,
      givenName: updated.givenName,
      passportNumber: updated.passportNumber,
      nationality: updated.nationality,
      issuer: updated.issuer,
      dateOfBirth: updated.dateOfBirth,
      expiryDate: updated.expiryDate,
      sex: updated.sex,
      extraInfo: updated.extraInfo,
    })
    
    updated.mrzLine1 = mrz.line1
    updated.mrzLine2 = mrz.line2
    
    setFormData(updated)
    onUpdate(updated)
  }

  const handleDateChange = (field: 'dateOfBirth' | 'expiryDate', value: string) => {
    handleChange(field, value)
  }

  return (
    <Card className="glass-card border-white/5 overflow-hidden shadow-2xl">
      <CardHeader className="pb-6 border-b border-white/5 bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">Identity Profile</CardTitle>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Profile Editor</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="text-[10px] font-mono text-blue-500 font-bold">RECORD #{index + 1}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <Button 
               size="sm" 
               variant="outline" 
               onClick={() => onDuplicate(row)}
               className="h-10 w-10 p-0 rounded-xl border-white/10 hover:bg-indigo-500/10 hover:text-indigo-500 hover:border-indigo-500/20 transition-all"
               title="Duplicate Profile"
             >
               <Copy className="h-4 w-4" />
             </Button>

             <Button 
               size="sm" 
               variant="outline" 
               onClick={() => onDelete(row.id)}
               className="h-10 w-10 p-0 rounded-xl border-white/10 hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all"
               title="Delete Profile"
             >
               <Trash2 className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Names Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Surname</Label>
            <div className="relative">
              <Input
                value={formData.surname}
                onChange={(e) => handleChange('surname', e.target.value.toUpperCase())}
                className="glass border-white/10 h-10 px-3 font-medium focus-visible:ring-blue-500/50"
                placeholder="DOE"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Given Names</Label>
            <Input
              value={formData.givenName}
              onChange={(e) => handleChange('givenName', e.target.value.toUpperCase())}
              className="glass border-white/10 h-10 px-3 font-medium focus-visible:ring-blue-500/50"
              placeholder="JOHN"
            />
          </div>
        </div>

        {/* Identity & Origin */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2 col-span-1">
            <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Passport #</Label>
            <Input
              value={formData.passportNumber}
              onChange={(e) => handleChange('passportNumber', e.target.value.toUpperCase())}
              className="glass border-white/10 h-10 px-3 font-mono font-bold focus-visible:ring-blue-500/50"
              placeholder="A12345678"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Nationality</Label>
            <Input
              value={formData.nationality}
              onChange={(e) => handleChange('nationality', e.target.value.toUpperCase().slice(0, 3))}
              className="glass border-white/10 h-10 px-3 font-bold focus-visible:ring-blue-500/50"
              placeholder="USA"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Issuer</Label>
            <Input
              value={formData.issuer}
              onChange={(e) => handleChange('issuer', e.target.value.toUpperCase().slice(0, 3))}
              className="glass border-white/10 h-10 px-3 font-bold focus-visible:ring-blue-500/50"
              placeholder="USA"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Extra Info</Label>
            <Input
              value={formData.extraInfo}
              onChange={(e) => handleChange('extraInfo', e.target.value.toUpperCase())}
              className="glass border-white/10 h-10 px-3 font-mono focus-visible:ring-blue-500/50"
              placeholder="12345678901234"
            />
          </div>
        </div>

        {/* Vital Info: DOB, Expiry, Sex */}
        <div className="grid grid-cols-2 gap-6 pt-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Date of Birth</Label>
                <span className="text-[8px] text-slate-400">YYMMDD</span>
              </div>
              <Input
                value={formData.dateOfBirth}
                onChange={(e) => handleDateChange('dateOfBirth', e.target.value)}
                className="glass border-white/10 h-10 px-3 font-mono focus-visible:ring-blue-500/50"
                placeholder="900101"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Expiry Date</Label>
                <span className="text-[8px] text-slate-400">YYMMDD</span>
              </div>
              <Input
                value={formData.expiryDate}
                onChange={(e) => handleDateChange('expiryDate', e.target.value)}
                className="glass border-white/10 h-10 px-3 font-mono focus-visible:ring-blue-500/50"
                placeholder="300101"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Sex / Gender</Label>
            <RadioGroup 
              value={formData.sex} 
              onValueChange={(val: string) => handleChange('sex', val)}
              className="grid grid-cols-1 gap-2"
            >
              <div className="flex items-center space-x-3 space-y-0 glass px-4 py-2.5 rounded-xl border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <RadioGroupItem value="M" id={`sex-m-${row.id}`} className="border-white/20 text-blue-500" />
                <Label htmlFor={`sex-m-${row.id}`} className="text-xs font-bold cursor-pointer">Male (M)</Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0 glass px-4 py-2.5 rounded-xl border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <RadioGroupItem value="F" id={`sex-f-${row.id}`} className="border-white/20 text-rose-500" />
                <Label htmlFor={`sex-f-${row.id}`} className="text-xs font-bold cursor-pointer">Female (F)</Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0 glass px-4 py-2.5 rounded-xl border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <RadioGroupItem value="X" id={`sex-x-${row.id}`} className="border-white/20 text-slate-400" />
                <Label htmlFor={`sex-x-${row.id}`} className="text-xs font-bold cursor-pointer">Unspecified (<span className="font-mono">X</span>)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Extra Metadata (Simulated) */}
        <div className="pt-4 border-t border-white/5">
           <div className="flex items-center gap-2 mb-3">
             <Info className="h-3 w-3 text-slate-500" />
             <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Calculated Metadata</span>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="glass p-3 rounded-xl border-white/5 space-y-1">
                <div className="text-[8px] font-bold text-slate-500 uppercase">Hash Value</div>
                <div className="text-[10px] font-mono text-slate-400 truncate">SHA256:{btoa(formData.passportNumber || 'none').slice(0, 16)}...</div>
              </div>
              <div className="glass p-3 rounded-xl border-white/5 space-y-1">
                <div className="text-[8px] font-bold text-slate-500 uppercase">Sync Status</div>
                <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  REAL-TIME
                </div>
              </div>
           </div>
        </div>
      </CardContent>
    </Card>
  )
}
