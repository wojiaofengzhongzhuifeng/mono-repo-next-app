import React from 'react'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { InputArea } from '@/source/marquee/_components/input-area'
import { DisplayArea } from '@/source/marquee/_components/display-area'

const MarqueePage: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          {t('title')}
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* 左侧：输入区域 */}
          <div>
            <InputArea />
          </div>

          {/* 右侧：展示区域 */}
          <div>
            <DisplayArea />
          </div>
        </div>

        {/* 使用说明 */}
        <div className='mt-12 bg-gray-50 p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>使用说明</h2>
          <div className='space-y-3 text-gray-700'>
            <div>
              <h3 className='font-medium'>🎯 跑马灯效果</h3>
              <p className='text-sm'>
                文字沿固定方向匀速移动，支持四个方向，可调节移动速度。
              </p>
            </div>
            <div>
              <h3 className='font-medium'>✨ 闪烁提醒</h3>
              <p className='text-sm'>
                整体内容按固定频率闪烁，可调节闪烁频率，适用于重要信息提醒。
              </p>
            </div>
            <div>
              <h3 className='font-medium'>💡 逐字点亮</h3>
              <p className='text-sm'>
                文字按顺序逐个亮起，创造独特的视觉效果，适合标题展示。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'zh', ['common'])),
    },
  }
}

export default MarqueePage
