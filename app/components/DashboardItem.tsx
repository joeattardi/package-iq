export default function DashboardItem({ label, value }) {
  return (
    <div className="bg-white px-4 py-2 rounded shadow">
      <div className="text-sm text-stone-700">{label}</div>
      <div className="text-lg">{value}</div>
    </div>
  )
}