import React, { type PropsWithChildren } from 'react'

const CardContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='grid lg:grid-cols-2 gap-y-4 lg:gap-y-0 lg:gap-x-6 my-4 rounded-lg'>
        {children}
    </div>
  )
}

export default CardContainer