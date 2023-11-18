import React, { useState } from 'react'

type TabData = {
  key: string
  title: string
  content: React.ReactNode
}

type TabProps = {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

type TabsProps = {
  tabs: TabData[]
}

const Tab = ({ active, onClick, children }: TabProps) => (
  <button
    className={`group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 hover:border-red-500 hover:text-red-800 ${
      active
        ? 'active border-red-900 text-red-900 hover:border-red-900 hover:text-red-900'
        : 'ph-color-secondary border-transparent'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key)

  return (
    <>
      <div className='border-b border-gray-200'>
        <nav
          className='-mb-px flex flex-wrap text-center font-medium text-gray-500 dark:text-gray-400'
          aria-label='Tabs'
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.title}
            </Tab>
          ))}
        </nav>
      </div>
      {tabs.map(
        (tab) =>
          activeTab === tab.key && <div key={tab.key}>{tab.content}</div>,
      )}
    </>
  )
}

export default Tabs
