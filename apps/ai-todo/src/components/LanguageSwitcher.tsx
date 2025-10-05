import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleLanguageChange = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale })
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">{t('language.switch')}:</span>
      <button
        onClick={() => handleLanguageChange('zh')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          router.locale === 'zh'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {t('language.chinese')}
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          router.locale === 'en'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {t('language.english')}
      </button>
    </div>
  )
}
