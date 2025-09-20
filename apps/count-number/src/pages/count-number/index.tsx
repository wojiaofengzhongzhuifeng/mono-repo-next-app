import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import Home from '@/source/page'
import { get } from '@mono-repo/utils'

interface PageProps {
  test: number
}

// SSR implementation
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    const response = await get<{ count: number }>({
      url: '/get-count'
    })

    console.log('response', response)
    
    return {
      props: {
        test: response.data?.count || 2222
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