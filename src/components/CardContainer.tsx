import React, { type PropsWithChildren } from 'react'

const CardContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='grid grid-cols-2 gap-x-6 my-4 rounded-lg'>
        {children}
    </div>
  )
}

export default CardContainer