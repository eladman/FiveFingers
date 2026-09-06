import { useEffect, useMemo, useState } from 'react'
import { supabase } from './supabaseClient.js'
import { downloadCsv } from './csv.js'
import Drawer from './Drawer.jsx'

const startOfWeek = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - 7)
  return d
}

export default function Submissions() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  async function load() {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      setError('שגיאה בטעינת הנתונים: ' + error.message)
      setRows([])
    } else {
      setRows(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  // Distinct product types present in the data (for the type filter).
  const types = useMemo(() => {
    const set = new Set(rows.map((r) => r.product_type).filter(Boolean))
    return Array.from(set).sort()
  }, [rows])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return rows.filter((r) => {
      if (typeFilter !== 'all' && r.product_type !== typeFilter) return false
      if (q) {
        const hay = `${r.name || ''} ${r.phone || ''} ${r.email || ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [rows, typeFilter, search])

  const kpis = useMemo(() => {
    const weekStart = startOfWeek()
    return {
      total: rows.length,
      week: rows.filter((r) => new Date(r.created_at) >= weekStart).length,
    }
  }, [rows])

  // Optimistic update after the drawer saves.
  function applyUpdate(id, patch) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
    setSelected((s) => (s && s.id === id ? { ...s, ...patch } : s))
  }

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3">
        <Kpi label="סה״כ פניות" value={kpis.total} accent />
        <Kpi label="ב־7 ימים" value={kpis.week} />
      </div>

      {/* Toolbar */}
      <div className="dash-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            className="dash-input flex-1 min-w-[200px]"
            placeholder="חיפוש לפי שם, טלפון או מייל…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="dash-select w-auto min-w-[160px]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">כל התחומים</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            className="dash-btn-ghost"
            onClick={() => downloadCsv(filtered)}
            disabled={!filtered.length}
          >
            ייצוא CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="dash-card overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-navy/40 text-sm">טוען פניות…</div>
        ) : error ? (
          <div className="p-10 text-center text-red-600 text-sm">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-navy/40 text-sm">אין פניות התואמות לסינון.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-navy/45 text-xs border-b border-line">
                  <Th>תאריך</Th>
                  <Th>שם</Th>
                  <Th>טלפון</Th>
                  <Th>מייל</Th>
                  <Th>תחום</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className="border-b border-line/60 hover:bg-surface-2 cursor-pointer transition-colors"
                  >
                    <Td className="whitespace-nowrap text-navy/60">{formatDate(r.created_at)}</Td>
                    <Td className="font-semibold">{r.name}</Td>
                    <Td dir="ltr" className="text-navy/70">{r.phone}</Td>
                    <Td dir="ltr" className="text-navy/70">{r.email}</Td>
                    <Td className="text-navy/70">{r.product_type}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-xs text-navy/40 text-center">
        מציג {filtered.length} מתוך {rows.length} פניות
      </div>

      {selected && (
        <Drawer
          row={selected}
          onClose={() => setSelected(null)}
          onSaved={(patch) => applyUpdate(selected.id, patch)}
        />
      )}
    </div>
  )
}

function Kpi({ label, value, accent }) {
  return (
    <div className="dash-card p-4">
      <div className="text-xs text-navy/45 mb-1">{label}</div>
      <div className={`text-3xl font-bold ${accent ? 'text-orange-ink' : 'text-navy'}`}>{value}</div>
    </div>
  )
}

function Th({ children }) {
  return <th className="text-right font-medium px-4 py-3">{children}</th>
}
function Td({ children, className = '', dir }) {
  return (
    <td dir={dir} className={`px-4 py-3 ${className}`}>
      {children}
    </td>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
