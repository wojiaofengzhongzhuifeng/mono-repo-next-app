import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Page from '@/source/home-page/page'

export default function Home() {
  return <Page />
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
