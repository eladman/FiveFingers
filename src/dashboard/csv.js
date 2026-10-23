import { CSV_COLUMNS, FIELD_LABELS, ATTRIBUTION_LABELS, getAttribution } from './constants.js'

export function escapeCell(value) {
  if (value == null) return ''
  const s = String(value)
  // Quote if it contains comma, quote, or newline; double up inner quotes.
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  // dd/mm/yyyy hh:mm — readable in Hebrew Excel
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// Turn rows into a CSV string with a UTF-8 BOM so Hebrew opens correctly in Excel.
export function rowsToCsv(rows) {
  const header = CSV_COLUMNS.map((c) => escapeCell(FIELD_LABELS[c] || ATTRIBUTION_LABELS[c] || headerFallback(c)))
  const lines = [header.join(',')]

  for (const row of rows) {
    const cells = CSV_COLUMNS.map((c) => {
      let v = c.startsWith('utm_') ? getAttribution(row)?.[c] : row[c]
      if (c === 'created_at' || c === 'submitted_at') v = formatDate(v)
      return escapeCell(v)
    })
    lines.push(cells.join(','))
  }

  return '﻿' + lines.join('\r\n')
}

function headerFallback(col) {
  const extra = { created_at: 'התקבל', staff_notes: 'הערות צוות' }
  return extra[col] || col
}

export function downloadCsv(rows, filename = 'pniyot.csv') {
  downloadText(rowsToCsv(rows), filename)
}

// Generic table → CSV download (header row + array rows), same BOM/escaping.
export function downloadTable(header, rows, filename) {
  const lines = [header, ...rows].map((r) => r.map(escapeCell).join(','))
  downloadText('\ufeff' + lines.join('\r\n'), filename)
}

function downloadText(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
