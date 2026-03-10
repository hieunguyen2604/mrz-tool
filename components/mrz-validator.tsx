'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { validateMRZ } from '@/lib/mrz-utils'

export default function MRZValidator() {
  const [mrzInput, setMrzInput] = React.useState('')
  const [validationResult, setValidationResult] = React.useState<ReturnType<typeof validateMRZ> | null>(null)

  const handleValidate = () => {
    const lines = mrzInput
      .trim()
      .split('\n')
      .filter(line => line.trim())

    if (lines.length !== 2) {
      setValidationResult({
        isValid: false,
        errors: ['Please provide exactly 2 MRZ lines'],
      })
      return
    }

    const result = validateMRZ(lines[0], lines[1])
    setValidationResult(result)
  }

  const handleClearAll = () => {
    setMrzInput('')
    setValidationResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>MRZ Validator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={`Paste your MRZ lines here:\nP<USANOWATKA<<DIANN<<<<<<<<<<<<<<<<<<<<<<<<<\n5432636878USA9011148M2610162336874658<716808`}
          value={mrzInput}
          onChange={(e) => setMrzInput(e.target.value)}
          className="font-mono text-sm min-h-24"
        />

        <div className="flex gap-2">
          <Button onClick={handleValidate} className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Validate MRZ
          </Button>
          <Button onClick={handleClearAll} variant="outline">
            Clear
          </Button>
        </div>

        {validationResult && (
          <>
            {validationResult.isValid ? (
              <Alert variant="success">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Valid MRZ</AlertTitle>
                <AlertDescription>
                  All check digits are correct and format is valid.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Invalid MRZ</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {validationResult.errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {validationResult.data && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold text-sm mb-2">Identity Information</h3>
                  <div className="space-y-1 text-sm">
                    <div><strong>Surname:</strong> {validationResult.data.surname || '-'}</div>
                    <div><strong>Given Name:</strong> {validationResult.data.givenName || '-'}</div>
                    <div><strong>Passport Number:</strong> {validationResult.data.passportNumber}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">Document Details</h3>
                  <div className="space-y-1 text-sm">
                    <div><strong>Issuer:</strong> {validationResult.data.issuer}</div>
                    <div><strong>Nationality:</strong> {validationResult.data.nationality}</div>
                    <div><strong>Sex:</strong> {validationResult.data.sex === 'M' ? 'Male' : validationResult.data.sex === 'F' ? 'Female' : 'Unspecified'}</div>
                    <div><strong>Extra Info:</strong> <span className="font-mono">{validationResult.data.extraInfo || '-'}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">Dates</h3>
                  <div className="space-y-1 text-sm">
                    <div><strong>Date of Birth:</strong> {validationResult.data.dateOfBirth}</div>
                    <div><strong>Expiry Date:</strong> {validationResult.data.expiryDate}</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <p className="font-semibold mb-2"><strong>Note:</strong> The MRZ Validator checks ICAO 9303 TD3 passport format. It validates:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Line 1: 44 characters (P&lt;ISSUER...)</li>
              <li>Line 2: 44 characters (Passport number, dates, check digits)</li>
              <li>All check digits according to ICAO algorithm</li>
              <li>Character encoding and format rules</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
