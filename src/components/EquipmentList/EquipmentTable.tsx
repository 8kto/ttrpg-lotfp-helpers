'use client'

import ArmorGrid from "@/components/EquipmentList/ArmorGrid"
import WeaponsGrid from "@/components/EquipmentList/WeaponsGrid"

export default function EquipmentTable() {
  return (
    <>
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Equipment</h1>

      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Armor</h3>
      <ArmorGrid />

      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Weapons</h3>
      <WeaponsGrid />
    </>
  )
}
