import classnames from 'classnames'
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

const Tab = ({ active, onClick, children }: TabProps) => {
  const handleDragStart = () => {
    const scrollbar = document.querySelector('.ph-tabs-scrollbar')
    scrollbar?.classList.add('active-scrollbar')
  }

  const handleDragEnd = () => {
    const scrollbar = document.querySelector('.ph-tabs-scrollbar')
    scrollbar?.classList.remove('active-scrollbar')
  }

  return (
    <button
      role='tab'
      className={classnames(
        'group inline-flex items-center justify-center p-4',
        'text-sm font-medium text-gray-500 md:text-base',
        'hover:ph-color-accent outline-gray-200 focus-visible:border-b-transparent',
        {
          'active ph-color-accent rounded-tl rounded-tr border': active,
          'bg-gray-50 text-gray-500 hover:text-red-800': !active,
        },
      )}
      onClick={onClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable='true'
    >
      {children}
    </button>
  )
}

const Tabs = ({ tabs, onTabClick, activeTabId }: TabsProps) => {
  return (
    <>
      <div className='ph-tabs-scrollbar overflow-x-auto md:border-b md:border-gray-200'>
        <nav
          className='-mb-px flex flex-nowrap whitespace-nowrap'
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
