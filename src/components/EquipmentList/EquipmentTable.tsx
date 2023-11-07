'use client'

import ArmorGrid from "@/components/EquipmentList/ArmorGrid"

export default function EquipmentTable() {
  return (
    <>
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Equipment</h1>
      <ArmorGrid />
    </>
  )
}
