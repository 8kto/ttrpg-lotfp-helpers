import React, { useEffect, useState } from 'react'

export const ModalMessage = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [message])

  return (
    <div
      className={`fixed left-1/2 top-0 -translate-x-1/2 transform rounded-md bg-blue-500 p-4 text-white shadow-lg transition-opacity duration-1000 ${
        isVisible ? 'block opacity-100' : 'hidden opacity-0'
      }`}
      /*FIXME remove?*/
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      {message}
    </div>
  )
}

export const ModalButton = ({
  title,
  message,
}: {
  title: string
  message: string
}) => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(true)
    setTimeout(() => setShowModal(false), 1100)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      >
        {title}
      </button>
      {showModal && <ModalMessage message={message} />}
    </>
  )
}
