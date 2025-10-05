import React from 'react'
import { useGlobalStore } from '@/store/global-store'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

function Content() {
  const { t } = useTranslation('common')
  const { globalNumber, increment, decrement, reset } = useGlobalStore()

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{t('ai.title')}</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Global Number from Home: {globalNumber}
        </h3>
        <p className="mb-4">{t('ai.description')}</p>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder={t('ai.inputPlaceholder')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            {t('ai.send')}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Content
