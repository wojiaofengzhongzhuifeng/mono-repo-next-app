import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AIPage from '@/source/ai/page'

export default function AIPageRoute() {
  return (
    <div>
      <AIPage />
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
