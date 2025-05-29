/**
 * Sanitizes code by removing potentially dangerous patterns
 * @param code The code to sanitize
 * @returns Sanitized code
 */
export function sanitizeCode(code: string): string {
  // Only block dangerous JS patterns, do NOT remove JSX tags!
  const dangerousPatterns = [
    /eval\s*\(/gi,
    /Function\s*\(/gi,
    /setTimeout\s*\(/gi,
    /setInterval\s*\(/gi,
    /new\s+Function/gi,
    /document\./gi,
    /window\./gi,
    /localStorage/gi,
    /sessionStorage/gi,
    /indexedDB/gi,
    /fetch\s*\(/gi,
    /XMLHttpRequest/gi,
    /WebSocket/gi,
    /Worker/gi,
    /import\s*\(/gi,
    /require\s*\(/gi
  ];

  let sanitized = code;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '// Blocked: $&');
  });

  return sanitized;
}

/**
 * Validates if code is safe to execute
 * @param code The code to validate
 * @returns boolean indicating if code is safe
 */
export function isCodeSafe(code: string): boolean {
  const dangerousPatterns = [
    /eval\s*\(/gi,
    /Function\s*\(/gi,
    /setTimeout\s*\(/gi,
    /setInterval\s*\(/gi,
    /new\s+Function/gi,
    /document\./gi,
    /window\./gi,
    /localStorage/gi,
    /sessionStorage/gi,
    /indexedDB/gi,
    /fetch\s*\(/gi,
    /XMLHttpRequest/gi,
    /WebSocket/gi,
    /Worker/gi,
    /import\s*\(/gi,
    /require\s*\(/gi
  ];

  return !dangerousPatterns.some(pattern => pattern.test(code));
} 