import React from 'react'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

const HomePage: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-6'>{t('title')}</h1>
        <p className='text-xl text-gray-600 mb-8'>
          体验丰富的文本动画效果，包括跑马灯、闪烁提醒和逐字点亮等多种效果
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-3'>{t('marqueeEffect')}</h3>
            <p className='text-gray-600 mb-4'>
              文本沿固定方向匀速移动，支持四个方向的跑马灯效果
            </p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-3'>{t('blinkEffect')}</h3>
            <p className='text-gray-600 mb-4'>
              整体内容按固定频率闪烁，可调节闪烁频率
            </p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-3'>
              {t('sequentialLightEffect')}
            </h3>
            <p className='text-gray-600 mb-4'>
              文字按顺序逐个亮起，创造独特的视觉效果
            </p>
          </div>
        </div>

        <Link href='/marquee'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors'>
            开始体验
          </button>
        </Link>
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

export default HomePage
