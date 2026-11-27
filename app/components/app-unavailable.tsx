'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface IAppUnavailableProps {
  isUnknownReason: boolean
  errMessage?: string
}

const AppUnavailable: FC<IAppUnavailableProps> = ({
  isUnknownReason,
  errMessage,
}) => {
  const { t } = useTranslation()
  let message = errMessage
  if (!errMessage) { message = (isUnknownReason ? t('app.common.appUnkonwError') : t('app.common.appUnavailable')) as string }

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-cream bg-doodles px-4'>
      <div className='flex flex-col items-center gap-3 rounded-2xl border border-ink/5 bg-card px-8 py-8 text-center shadow-soft'>
        <img src='/logo.svg' alt='SoloMeal' className='h-14 w-14' />
        <div className='font-display text-xl font-extrabold'>
          <span className='text-forest'>Solo</span><span className='text-tomato'>Meal</span>
        </div>
        <div className='text-sm text-stone'>{(errMessage || isUnknownReason) ? '厨房暂时开不了火（500）' : '这道菜暂时上不了（404）'}</div>
        <div className='max-w-[360px] text-xs leading-5 text-stone/80'>{message}</div>
        <div
          className='mt-1 cursor-pointer rounded-xl bg-forest px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-deep'
          onClick={() => location.reload()}
        >
          重新加载
        </div>
      </div>
    </div>
  )
}
export default React.memo(AppUnavailable)
