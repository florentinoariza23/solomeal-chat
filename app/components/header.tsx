import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
export interface IHeaderProps {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}
const Header: FC<IHeaderProps> = ({
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-cream">
      {isMobile
        ? (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer rounded-lg hover:bg-mint-soft'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-4 w-4 text-forest" />
          </div>
        )
        : <div className='w-8'></div>}
      <div className='flex items-center gap-2'>
        <img src='/logo.svg' alt='SoloMeal' className='h-7 w-7' />
        <div className="font-display text-base font-extrabold tracking-tight">
          <span className='text-forest'>Solo</span><span className='text-tomato'>Meal</span>
        </div>
        <div className='hidden tablet:block text-xs text-stone font-medium'>· AI 一人食管家</div>
      </div>
      {isMobile
        ? (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer rounded-lg hover:bg-mint-soft' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-4 w-4 text-forest" />
          </div>)
        : <div className='w-8'></div>}
    </div>
  )
}

export default React.memo(Header)
