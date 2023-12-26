import React from 'react'

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
  activeTabId: number
  onTabClick: (index: number) => void
}

const Tab = ({ active, onClick, children }: TabProps) => (
  <button
    role='tab'
    className={`group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 outline-transparent hover:border-red-500 hover:text-red-800 focus-visible:border-b-transparent ${
      active
        ? 'active border-red-900 text-red-900 hover:border-red-900 hover:text-red-900'
        : 'border-transparent text-gray-500'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

const Tabs = ({ tabs, onTabClick, activeTabId }: TabsProps) => {
  return (
    <>
      <div className='border-b border-gray-200'>
        <nav
          className='-mb-px flex flex-wrap text-center font-medium text-gray-500 dark:text-gray-400'
          aria-label='Tabs'
          role='tablist'
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.key}
              active={index === activeTabId}
              onClick={() => onTabClick(index)}
            >
              {tab.title}
            </Tab>
          ))}
        </nav>
      </div>
      {tabs.map(
        (tab, index) =>
          index === activeTabId && (
            <div key={tab.key} role='tabpanel'>
              {tab.content}
            </div>
          ),
      )}
    </>
  )
}

export default Tabs
