import { z } from 'zod'

export const MRZRowSchema = z.object({
  id: z.string(),
  surname: z.string().min(1, 'Surname required'),
  givenName: z.string().min(1, 'Given name required'),
  passportNumber: z.string().regex(/^[A-Z0-9]{6,9}$/, 'Passport: 6-9 alphanumeric'),
  nationality: z.string().regex(/^[A-Z]{3}$/, 'Nationality must be 3 letters'),
  issuer: z.string().regex(/^[A-Z]{3}$/, 'Issuer must be 3 letters'),
  dateOfBirth: z.string().regex(/^\d{6}$/, 'Date of birth must be YYMMDD'),
  expiryDate: z.string().regex(/^\d{6}$/, 'Expiry date must be YYMMDD'),
  sex: z.enum(['M', 'F'], { errorMap: () => ({ message: 'Sex must be M or F' }) }),
  mrzLine1: z.string(),
  mrzLine2: z.string(),
})

export type MRZRow = z.infer<typeof MRZRowSchema>

export function validateRow(row: any): { valid: boolean; errors: Record<string, string> } {
  try {
    MRZRowSchema.parse(row)
    return { valid: true, errors: {} }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message
        }
      })
      return { valid: false, errors }
    }
    return { valid: false, errors: { general: 'Validation error' } }
  }
}
