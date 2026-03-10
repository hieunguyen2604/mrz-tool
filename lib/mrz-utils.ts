/**
 * MRZ (Machine Readable Zone) Utilities
 * ICAO 9303 TD3 Passport Format
 */

interface MRZData {
  surname: string
  givenName: string
  passportNumber: string
  nationality: string
  issuer: string
  dateOfBirth: string
  expiryDate: string
  sex: string
}

interface MRZResult {
  line1: string
  line2: string
  isValid: boolean
  errors: string[]
}

/**
 * Convert character to MRZ numeric value
 * 0-9 → numeric value
 * A-Z → 10-35
 * < → 0
 * Space → 0
 */
function charToMRZValue(char: string): number {
  char = char.toUpperCase()
  if (char === '<' || char === ' ') return 0
  if (char >= '0' && char <= '9') return parseInt(char)
  if (char >= 'A' && char <= 'Z') return char.charCodeAt(0) - 55
  return 0
}

/**
 * Calculate ICAO checksum using weights 7, 3, 1 repeating
 */
export function calculateChecksum(input: string): string {
  const weights = [7, 3, 1]
  let sum = 0

  for (let i = 0; i < input.length; i++) {
    const value = charToMRZValue(input[i])
    const weight = weights[i % 3]
    sum += value * weight
  }

  const checkDigit = sum % 10
  return checkDigit.toString()
}

/**
 * Validate a complete MRZ check digit
 */
export function validateMRZCheckDigit(data: string, checkDigit: string): boolean {
  const calculated = calculateChecksum(data)
  return calculated === checkDigit
}

/**
 * Pad string with '<' characters
 */
function padMRZ(str: string, length: number): string {
  str = str.toUpperCase().replace(/[^A-Z0-9<]/g, '<')
  return str.padEnd(length, '<')
}

/**
 * Generate MRZ Line 1 (TD3 format)
 * Format: P<[ISSUER][SURNAME]<<[GIVENNAME]<<<<<<<<<<<<
 * Total: 44 characters
 */
export function generateMRZLine1(data: MRZData): string {
  const issuer = padMRZ(data.issuer, 3)
  const surnames = data.surname.toUpperCase().replace(/[^A-Z]/g, '')
  const givenNames = data.givenName.toUpperCase().replace(/[^A-Z]/g, '')

  const combined = `${surnames}<<${givenNames}`
  const paddedCombined = padMRZ(combined, 39)

  return `P<${issuer}${paddedCombined}`
}

/**
 * Generate MRZ Line 2 (TD3 format)
 * Format: [PASSPORT#][CHECK1][NATIONALITY][DOB][CHECK2][SEX][EXPIRY][CHECK3][BUILDER]
 * Total: 44 characters
 */
export function generateMRZLine2(data: MRZData): string {
  // Passport number (9 chars, left-aligned, padded with <)
  const passportPadded = padMRZ(data.passportNumber, 9)

  // Nationality (3 chars, left-aligned)
  const nationality = padMRZ(data.nationality, 3)

  // Date of Birth (6 chars, YYMMDD)
  const dob = data.dateOfBirth.slice(-6)

  // Sex (1 char, M/F)
  const sex = data.sex.toUpperCase() === 'M' ? 'M' : 'F'

  // Expiry Date (6 chars, YYMMDD)
  const expiry = data.expiryDate.slice(-6)

  // Calculate check digits
  const passportCheck = calculateChecksum(passportPadded)
  const dobCheck = calculateChecksum(dob)
  const expiryCheck = calculateChecksum(expiry)

  // Composite check (entire line2 without the last check digit)
  const composite = `${passportPadded}${passportCheck}${nationality}${dob}${dobCheck}${sex}${expiry}${expiryCheck}`
  const compositeCheck = calculateChecksum(composite)

  return `${composite}${compositeCheck}<<<<<<`
}

/**
 * Generate complete MRZ (both lines)
 */
export function generateMRZ(data: MRZData): MRZResult {
  const errors: string[] = []

  // Validation
  if (!data.surname) errors.push('Surname is required')
  if (!data.givenName) errors.push('Given name is required')
  if (!data.passportNumber) errors.push('Passport number is required')
  if (!data.nationality || data.nationality.length !== 3) errors.push('Nationality must be 3 characters')
  if (!data.issuer || data.issuer.length !== 3) errors.push('Issuer must be 3 characters')
  if (!data.dateOfBirth || data.dateOfBirth.length !== 6) errors.push('Date of birth must be YYMMDD')
  if (!data.expiryDate || data.expiryDate.length !== 6) errors.push('Expiry date must be YYMMDD')
  if (!['M', 'F'].includes(data.sex.toUpperCase())) errors.push('Sex must be M or F')

  const line1 = generateMRZLine1(data)
  const line2 = generateMRZLine2(data)

  return {
    line1,
    line2,
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Parse and validate MRZ lines
 */
export function validateMRZ(line1: string, line2: string): {
  isValid: boolean
  errors: string[]
  data?: {
    issuer: string
    surname: string
    givenName: string
    passportNumber: string
    nationality: string
    dateOfBirth: string
    expiryDate: string
    sex: string
  }
} {
  const errors: string[] = []

  // Basic format validation
  if (line1.length !== 44) {
    errors.push(`Line 1 must be 44 characters (got ${line1.length})`)
  }
  if (line2.length !== 44) {
    errors.push(`Line 2 must be 44 characters (got ${line2.length})`)
  }

  if (line1.length !== 44 || line2.length !== 44) {
    return { isValid: false, errors }
  }

  // Check line 1 format
  if (!line1.startsWith('P<')) {
    errors.push('Line 1 must start with P<')
  }

  // Extract and validate line 2 components
  const passportNumber = line2.substring(0, 9).replace(/<+$/, '')
  const passportCheck = line2[9]
  const nationality = line2.substring(10, 13)
  const dob = line2.substring(13, 19)
  const dobCheck = line2[19]
  const sex = line2[20]
  const expiry = line2.substring(21, 27)
  const expiryCheck = line2[27]
  const compositeCheck = line2[28]

  // Validate check digits
  if (!validateMRZCheckDigit(line2.substring(0, 9), passportCheck)) {
    errors.push('Invalid passport number check digit')
  }
  if (!validateMRZCheckDigit(dob, dobCheck)) {
    errors.push('Invalid date of birth check digit')
  }
  if (!validateMRZCheckDigit(expiry, expiryCheck)) {
    errors.push('Invalid expiry date check digit')
  }

  // Validate composite check
  const compositeData = `${line2.substring(0, 9)}${passportCheck}${nationality}${dob}${dobCheck}${sex}${expiry}${expiryCheck}`
  if (!validateMRZCheckDigit(compositeData, compositeCheck)) {
    errors.push('Invalid composite check digit')
  }

  // Extract data from line 1
  const dataLine1 = line1.substring(5, 44)
  const [namesPart, given] = dataLine1.split('<<')
  const surname = namesPart.replace(/<+$/, '')
  const givenName = given.replace(/<+$/, '')

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      issuer: line1.substring(2, 5),
      surname,
      givenName,
      passportNumber,
      nationality,
      dateOfBirth: dob,
      expiryDate: expiry,
      sex,
    },
  }
}

/**
 * Validate if a string is a valid YYMMDD date
 */
export function isValidDate(dateStr: string): boolean {
  if (!/^\d{6}$/.test(dateStr)) return false
  
  // const year = parseInt(dateStr.slice(0, 2))
  const month = parseInt(dateStr.slice(2, 4))
  const day = parseInt(dateStr.slice(4, 6))
  
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  
  // Basic month-day check (ignoring precise leap year for YY)
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (day > daysInMonth[month - 1]) return false
  
  return true
}

/**
 * Format and clean date string to YYMMDD
 */
export function formatDateToYYMMDD(date: string): string {
  if (!date) return ''

  // Remove all non-numeric characters
  const digits = date.replace(/\D/g, '')

  if (digits.length === 6) return digits
  if (digits.length === 8) {
    // YYYYMMDD → YYMMDD
    return digits.slice(2)
  }
  
  // DDMMYYYY or DDMMYY
  if (digits.length >= 6) {
    if (parseInt(digits.slice(2, 4)) > 12) { // Probably DDMM...
      const d = digits.slice(0, 2)
      const m = digits.slice(2, 4)
      const y = digits.slice(4, 6)
      return `${y}${m}${d}`
    }
  }

  return digits.slice(0, 6).padEnd(6, '0')
}

/**
 * Clean MRZ input from common OCR noise or weird characters
 */
export function cleanMRZInput(input: string): string {
  return input
    .toUpperCase()
    .replace(/[\n\r]/g, '') // Remove newlines
    .replace(/[^A-Z0-9<]/g, '<') // Replace invalid chars with <
    .substring(0, 44) // Limit to ICAO length
}
