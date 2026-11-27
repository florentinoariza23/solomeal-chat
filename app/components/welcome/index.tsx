'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TemplateVarPanel, { PanelTitle, VarOpBtnGroup } from '../value-panel'
import FileUploaderInAttachmentWrapper from '../base/file-uploader-in-attachment'
import s from './style.module.css'
import { AppInfoComp, ChatBtn, EditBtn, PromptTemplate } from './massive-component'
import type { AppInfo, PromptConfig } from '@/types/app'
import Toast from '@/app/components/base/toast'
import Select from '@/app/components/base/select'
import { DEFAULT_VALUE_MAX_LEN } from '@/config'

// regex to match the {{}} and replace it with a span
const regex = /\{\{([^}]+)\}\}/g

const QUICK_CARDS = [
  { tag: '🧺 记冰箱', title: '录入食材', desc: '刚买了什么？说一声就入库', prompt: '我刚买了3个番茄、5个鸡蛋和1瓶牛奶，帮我录入库存', img: '/images/tomato-egg.png' },
  { tag: '🍳 推菜谱', title: '今天吃什么', desc: '按现有食材推荐今天能做的菜', prompt: '根据我现有的食材，推荐几道今天能做的菜', img: '/images/teriyaki-rice.png' },
  { tag: '⏰ 清临期', title: '临期先吃掉', desc: '快过期的食材，优先安排掉', prompt: '有什么快过期的食材？', img: '/images/garlic-broccoli.png' },
  { tag: '🛒 列清单', title: '还缺什么', desc: '想做的菜，一键列出购物清单', prompt: '我想吃番茄炒蛋，还需要购买什么？', img: '/images/tomato-pasta.png' },
  { tag: '💚 懂口味', title: '饮食档案', desc: '记住你的偏好、忌口和过敏', prompt: '帮我设置个人饮食档案', img: '/images/avocado-sandwich.png' },
  { tag: '📖 私房菜', title: '我的菜谱', desc: '记下拿手菜，推荐时优先考虑', prompt: '帮我记一道菜谱', img: '/images/chicken-breast.png' },
]

const BrandHero: FC<{ onStartChat: () => void, onQuickSend?: (q: string) => void }> = ({ onStartChat, onQuickSend }) => {
  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-mint/50 blur-3xl'></div>
      <div className='pointer-events-none absolute top-40 -right-28 h-80 w-80 rounded-full bg-oat-soft/70 blur-3xl'></div>
      <div className='relative mx-auto max-w-[880px] px-4 pt-10 pb-8 tablet:pt-14'>
        <div className='sm-rise flex flex-col items-center text-center'>
          <div className='mb-3 rounded-full border border-sage/50 bg-mint-soft px-3.5 py-1 text-xs font-semibold tracking-wide text-forest-deep'>
            AI 一人食管家
          </div>
          <div className='flex items-center gap-3'>
            <img src='/logo.svg' alt='SoloMeal' className='h-14 w-14 tablet:h-16 tablet:w-16' />
            <div className='font-display text-4xl tablet:text-5xl font-extrabold tracking-tight'>
              <span className='text-forest'>Solo</span><span className='text-tomato'>Meal</span>
            </div>
          </div>
          <p className='mt-3 text-base tablet:text-lg font-medium text-ink'>一个人吃饭，也要好好吃。</p>
          <p className='mt-1.5 max-w-[520px] text-sm leading-6 text-stone'>
            告诉它你买了什么，它帮你记冰箱；说想吃什么，它推菜谱、列清单，还优先帮你吃掉快过期的食材。
          </p>
        </div>

        <div className='mt-8 grid grid-cols-2 gap-3 tablet:gap-3.5 pc:grid-cols-3'>
          {QUICK_CARDS.map((card, i) => (
            <div
              key={card.title}
              className='sm-rise group cursor-pointer overflow-hidden rounded-2xl border border-ink/5 bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-sage/60 hover:shadow-lift'
              style={{ animationDelay: `${120 + i * 70}ms` }}
              onClick={() => onQuickSend ? onQuickSend(card.prompt) : onStartChat()}
            >
              <div className='relative h-28 overflow-hidden'>
                <img src={card.img} alt={card.title} className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105' />
                <div className='absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent'></div>
                <div className='absolute bottom-2 left-3 rounded-full bg-card/90 px-2.5 py-0.5 text-[11px] font-semibold text-forest-deep'>{card.tag}</div>
              </div>
              <div className='p-3.5'>
                <div className='flex items-center justify-between'>
                  <div className='font-display text-base font-bold text-ink'>{card.title}</div>
                  <span className='text-sage transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-tomato'>→</span>
                </div>
                <div className='mt-1 text-xs leading-5 text-stone'>{card.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className='sm-rise mt-5 flex items-center gap-2.5 rounded-xl border border-oat/40 bg-oat-soft px-4 py-3 text-sm text-ink' style={{ animationDelay: '560ms' }}>
          <span className='text-lg'>📷</span>
          <span>也可以直接<b>上传冰箱照片</b>，AI 识别出食材后，你说「确认」就入库。</span>
        </div>

        <div className='sm-rise mt-7 flex flex-col items-center gap-2.5' style={{ animationDelay: '620ms' }}>
          <div
            className='flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-forest px-7 text-base font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-lift'
            onClick={onStartChat}
          >
            <svg width="18" height="19" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M18 10.5C18 14.366 14.418 17.5 10 17.5C8.58005 17.506 7.17955 17.1698 5.917 16.52L2 17.5L3.338 14.377C2.493 13.267 2 11.934 2 10.5C2 6.634 5.582 3.5 10 3.5C14.418 3.5 18 6.634 18 10.5ZM7 9.5H5V11.5H7V9.5ZM15 9.5H13V11.5H15V9.5ZM9 9.5H11V11.5H9V9.5Z" fill="white" />
            </svg>
            开始聊天
          </div>
          <div className='text-xs text-stone'>或点上方卡片快速提问 · 数据按用户隔离，别人看不到你的冰箱</div>
        </div>

        <div className='mt-8 flex items-center justify-center gap-1.5 text-xs text-stone/80'>
          <span>© SoloMeal {(new Date()).getFullYear()}</span>
          <span>·</span>
          <a className='hover:text-forest' href='https://dify.ai/' target='_blank' rel='noreferrer'>Powered by Dify</a>
        </div>
      </div>
    </div>
  )
}

export interface IWelcomeProps {
  conversationName: string
  hasSetInputs: boolean
  isPublicVersion: boolean
  siteInfo: AppInfo
  promptConfig: PromptConfig
  onStartChat: (inputs: Record<string, any>) => void
  canEditInputs: boolean
  savedInputs: Record<string, any>
  onInputsChange: (inputs: Record<string, any>) => void
  onQuickSend?: (q: string) => void
}

const Welcome: FC<IWelcomeProps> = ({
  conversationName,
  hasSetInputs,
  isPublicVersion,
  siteInfo,
  promptConfig,
  onStartChat,
  canEditInputs,
  savedInputs,
  onInputsChange,
  onQuickSend,
}) => {
  const { t } = useTranslation()
  const hasVar = promptConfig.prompt_variables.length > 0
  const [isFold, setIsFold] = useState<boolean>(true)
  const [inputs, setInputs] = useState<Record<string, any>>((() => {
    if (hasSetInputs) { return savedInputs }

    const res: Record<string, any> = {}
    if (promptConfig) {
      promptConfig.prompt_variables.forEach((item) => {
        res[item.key] = ''
      })
    }
    return res
  })())
  useEffect(() => {
    if (!savedInputs) {
      const res: Record<string, any> = {}
      if (promptConfig) {
        promptConfig.prompt_variables.forEach((item) => {
          res[item.key] = ''
        })
      }
      setInputs(res)
    }
    else {
      setInputs(savedInputs)
    }
  }, [savedInputs])

  const highLightPromoptTemplate = (() => {
    if (!promptConfig) { return '' }
    const res = promptConfig.prompt_template.replace(regex, (match, p1) => {
      return `<span class='text-gray-800 font-bold'>${inputs?.[p1] ? inputs?.[p1] : match}</span>`
    })
    return res
  })()

  const { notify } = Toast
  const logError = (message: string) => {
    notify({ type: 'error', message, duration: 3000 })
  }

  const renderHeader = () => {
    return (
      <div className='absolute top-0 left-0 right-0 flex items-center justify-between border-b border-cream-2 mobile:h-12 tablet:h-16 px-8 bg-card/90 backdrop-blur'>
        <div className='text-ink font-medium'>{conversationName}</div>
      </div>
    )
  }

  const renderInputs = () => {
    return (
      <div className='space-y-3'>
        {promptConfig.prompt_variables.map(item => (
          <div className='tablet:flex items-start mobile:space-y-2 tablet:space-y-0 mobile:text-xs tablet:text-sm' key={item.key}>
            <label className={`flex-shrink-0 flex items-center tablet:leading-9 mobile:text-gray-700 tablet:text-gray-900 mobile:font-medium pc:font-normal ${s.formLabel}`}>{item.name}</label>
            {item.type === 'select'
              && (
                <Select
                  className='w-full'
                  defaultValue={inputs?.[item.key]}
                  onSelect={(i) => { setInputs({ ...inputs, [item.key]: i.value }) }}
                  items={(item.options || []).map(i => ({ name: i, value: i }))}
                  allowSearch={false}
                  bgClassName='bg-gray-50'
                />
              )}
            {item.type === 'string' && (
              <input
                placeholder={`${item.name}${!item.required ? `(${t('app.variableTable.optional')})` : ''}`}
                value={inputs?.[item.key] || ''}
                onChange={(e) => { setInputs({ ...inputs, [item.key]: e.target.value }) }}
                className={'w-full flex-grow py-2 pl-3 pr-3 box-border rounded-lg bg-gray-50'}
                maxLength={item.max_length || DEFAULT_VALUE_MAX_LEN}
              />
            )}
            {item.type === 'paragraph' && (
              <textarea
                className="w-full h-[104px] flex-grow py-2 pl-3 pr-3 box-border rounded-lg bg-gray-50"
                placeholder={`${item.name}${!item.required ? `(${t('app.variableTable.optional')})` : ''}`}
                value={inputs?.[item.key] || ''}
                onChange={(e) => { setInputs({ ...inputs, [item.key]: e.target.value }) }}
              />
            )}
            {item.type === 'number' && (
              <input
                type="number"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                value={inputs[item.key]}
                onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
              />
            )}

            {
              item.type === 'file' && (
                <FileUploaderInAttachmentWrapper
                  fileConfig={{
                    allowed_file_types: item.allowed_file_types,
                    allowed_file_extensions: item.allowed_file_extensions,
                    allowed_file_upload_methods: item.allowed_file_upload_methods!,
                    number_limits: 1,
                    fileUploadConfig: {} as any,
                  }}
                  onChange={(files) => {
                    setInputs({ ...inputs, [item.key]: files[0] })
                  }}
                  value={inputs?.[item.key] || []}
                />
              )
            }
            {
              item.type === 'file-list' && (
                <FileUploaderInAttachmentWrapper
                  fileConfig={{
                    allowed_file_types: item.allowed_file_types,
                    allowed_file_extensions: item.allowed_file_extensions,
                    allowed_file_upload_methods: item.allowed_file_upload_methods!,
                    number_limits: item.max_length,
                    fileUploadConfig: {} as any,
                  }}
                  onChange={(files) => {
                    setInputs({ ...inputs, [item.key]: files })
                  }}
                  value={inputs?.[item.key] || []}
                />
              )
            }
          </div>
        ))}
      </div>
    )
  }

  const canChat = () => {
    const vars = promptConfig?.prompt_variables ?? []

    const hasEmptyRequired = vars.some((v) => {
      const isRequired = v?.required ?? true
      if (!isRequired) { return false }

      const val = inputs?.[v.key]

      if (typeof val === 'string') { return val.trim() === '' }

      return val === undefined || val === null
    })

    if (hasEmptyRequired) {
      logError(t('app.errorMessage.valueOfVarRequired'))
      return false
    }

    return true
  }

  const handleChat = () => {
    if (!canChat()) { return }

    Object.keys(inputs).forEach((key) => {
      if (!inputs[key])
      { delete inputs[key] }
    })

    onStartChat(inputs)
  }

  const renderNoVarPanel = () => {
    if (isPublicVersion) {
      return (
        <div>
          <AppInfoComp siteInfo={siteInfo} />
          <TemplateVarPanel
            isFold={false}
            header={
              <>
                <PanelTitle
                  title={t('app.chat.publicPromptConfigTitle')}
                  className='mb-1'
                />
                <PromptTemplate html={highLightPromoptTemplate} />
              </>
            }
          >
            <ChatBtn onClick={handleChat} />
          </TemplateVarPanel>
        </div>
      )
    }
    // private version
    return (
      <TemplateVarPanel
        isFold={false}
        header={
          <AppInfoComp siteInfo={siteInfo} />
        }
      >
        <ChatBtn onClick={handleChat} />
      </TemplateVarPanel>
    )
  }

  const renderVarPanel = () => {
    return (
      <TemplateVarPanel
        isFold={false}
        header={
          <AppInfoComp siteInfo={siteInfo} />
        }
      >
        {renderInputs()}
        <ChatBtn
          className='mt-3 mobile:ml-0 tablet:ml-[128px]'
          onClick={handleChat}
        />
      </TemplateVarPanel>
    )
  }

  const renderVarOpBtnGroup = () => {
    return (
      <VarOpBtnGroup
        onConfirm={() => {
          if (!canChat()) { return }

          onInputsChange(inputs)
          setIsFold(true)
        }}
        onCancel={() => {
          setInputs(savedInputs)
          setIsFold(true)
        }}
      />
    )
  }

  const renderHasSetInputsPublic = () => {
    if (!canEditInputs) {
      return (
        <TemplateVarPanel
          isFold={false}
          header={
            <>
              <PanelTitle
                title={t('app.chat.publicPromptConfigTitle')}
                className='mb-1'
              />
              <PromptTemplate html={highLightPromoptTemplate} />
            </>
          }
        />
      )
    }

    return (
      <TemplateVarPanel
        isFold={isFold}
        header={
          <>
            <PanelTitle
              title={t('app.chat.publicPromptConfigTitle')}
              className='mb-1'
            />
            <PromptTemplate html={highLightPromoptTemplate} />
            {isFold && (
              <div className='flex items-center justify-between mt-3 border-t border-indigo-100 pt-4 text-xs text-indigo-600'>
                <span className='text-gray-700'>{t('app.chat.configStatusDes')}</span>
                <EditBtn onClick={() => setIsFold(false)} />
              </div>
            )}
          </>
        }
      >
        {renderInputs()}
        {renderVarOpBtnGroup()}
      </TemplateVarPanel>
    )
  }

  const renderHasSetInputsPrivate = () => {
    if (!canEditInputs || !hasVar) { return null }

    return (
      <TemplateVarPanel
        isFold={isFold}
        header={
          <div className='flex items-center justify-between text-indigo-600'>
            <PanelTitle
              title={!isFold ? t('app.chat.privatePromptConfigTitle') : t('app.chat.configStatusDes')}
            />
            {isFold && (
              <EditBtn onClick={() => setIsFold(false)} />
            )}
          </div>
        }
      >
        {renderInputs()}
        {renderVarOpBtnGroup()}
      </TemplateVarPanel>
    )
  }

  const renderHasSetInputs = () => {
    if ((!isPublicVersion && !canEditInputs) || !hasVar) { return null }

    return (
      <div
        className='pt-[88px] mb-5'
      >
        {isPublicVersion ? renderHasSetInputsPublic() : renderHasSetInputsPrivate()}
      </div>)
  }

  if (!hasSetInputs && !hasVar) {
    return <BrandHero onStartChat={handleChat} onQuickSend={onQuickSend} />
  }

  return (
    <div className='relative mobile:min-h-[48px] tablet:min-h-[64px]'>
      {hasSetInputs && renderHeader()}
      <div className='mx-auto pc:w-[794px] max-w-full mobile:w-full px-3.5'>
        {/*  Has't set inputs  */}
        {
          !hasSetInputs && (
            <div className='mobile:pt-[72px] tablet:pt-[128px] pc:pt-[200px]'>
              {hasVar
                ? (
                  renderVarPanel()
                )
                : (
                  renderNoVarPanel()
                )}
            </div>
          )
        }

        {/* Has set inputs */}
        {hasSetInputs && renderHasSetInputs()}

        {/* foot */}
        {!hasSetInputs && (
          <div className='mt-4 flex justify-between items-center h-8 text-xs text-gray-400'>

            {siteInfo.privacy_policy
              ? <div>{t('app.chat.privacyPolicyLeft')}
                <a
                  className='text-gray-500'
                  href={siteInfo.privacy_policy}
                  target='_blank'
                >{t('app.chat.privacyPolicyMiddle')}</a>
                {t('app.chat.privacyPolicyRight')}
              </div>
              : <div>
              </div>}
            <a className='flex items-center pr-3 space-x-3' href="https://dify.ai/" target="_blank">
              <span className='uppercase'>{t('app.chat.powerBy')}</span>
            </a>
          </div>
        )}
      </div>
    </div >
  )
}

export default React.memo(Welcome)
