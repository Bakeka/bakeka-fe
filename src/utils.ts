/**
 * Transforms a string to titlecase, e.g. `STRING` becomes `String.`
 * 
 * @param s - The string to transform
 * @returns A copy of the string in titlecase
 */
export function toTitleCase(s: string): string {
    return s[0].toUpperCase() + s.substring(1).toLowerCase()
}