export function encodeCursor(cursor: string): string {
  return Buffer.from(cursor).toString('base64');
}

export function decodeCursor(cursor: string): string {
  return Buffer.from(cursor, 'base64').toString('ascii');
}
