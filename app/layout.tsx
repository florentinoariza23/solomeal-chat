import { getLocaleOnServer } from '@/i18n/server'
import '@fontsource-variable/nunito'
import '@fontsource-variable/noto-sans-sc'

import './styles/globals.css'
import './styles/markdown.scss'

export const metadata = {
  title: 'SoloMeal · AI 一人食管家',
  description: 'SoloMeal 帮你管理冰箱食材、推荐个性化菜谱、优先消耗临期食材、生成购物清单。一个人吃饭，也要好好吃。',
  icons: { icon: '/favicon.svg' },
}

export const viewport = {
  themeColor: '#F8F6EF',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    <html lang={locale ?? 'zh-Hans'} className="h-full">
      <body className="h-full">
        <div className="overflow-x-auto">
          <div className="w-screen h-screen min-w-[300px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
