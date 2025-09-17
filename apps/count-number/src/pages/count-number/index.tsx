import type { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from 'next'
import Home from './../../source/page'

interface PageProps {
  test: number
}

// SSR implementation
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: {
      test: 1
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