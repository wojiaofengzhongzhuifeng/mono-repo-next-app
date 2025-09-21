import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import Home from '@/source/page'
import { get } from '@mono-repo/utils'
import React from 'react'


interface PageProps {
  test: number
}

// SSR implementation
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    const response = await get<{ number: number, id: number, testList: number[] }>({
      url: 'http:localhost:3000/get-count'
    })

    console.log('response', response)
    
    return {
      props: {
        test: response.data?.number || 0
      }
    }
  } catch (error) {

    console.log('error', error)
    return {
      props: {
        test: 1
      }
    }
  }
}

// SSG implementation (comment out getServerSideProps above and uncomment this to use SSG)
// export const getStaticProps: GetStaticProps<PageProps> = async () => {
//   return {
//     props: {
//       test: 1
//     }
//   }
// }

export default function CountNumberPage({ test }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Home test={test} />
}