'use client'

import EquipmentTable from "@/components/EquipmentList/EquipmentTable"
import {useState} from "react"
import Tray from "@/components/Tray/Tray"

export default function Home() {
  return (
    <div className="flex pt-16 overflow-hidden bg-gray-50">
      <main className="w-full max-w-screen-2xl mx-auto overflow-y-auto">
        <div className="px-4 pt-6 2xl:px-0">
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 col-span-2">
              <EquipmentTable />
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 col-span-1">
              <Tray />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

