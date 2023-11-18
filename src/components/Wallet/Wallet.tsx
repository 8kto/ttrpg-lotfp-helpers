import React, { useState } from 'react'

import { t } from '@/locale/helpers'

const Wallet = () => {
  const [isManaged, setIsManaged] = useState(false)

  const handleSwitchClick = () => {
    setIsManaged((v) => !v)
  }

  const handleAddClick = () => {}

  return (
    <div className=''>
      <em className='cursor-pointer' onClick={handleSwitchClick}>
        {isManaged ? t('Enabled') : t('Do not count')}
      </em>
      <div>
        <button
          className='ph-btn-secondary my-1 inline-flex items-center rounded px-3 py-1 text-sm'
          onClick={handleAddClick}
        >
          Add coins
        </button>
      </div>
    </div>
  )
}

export default Wallet
