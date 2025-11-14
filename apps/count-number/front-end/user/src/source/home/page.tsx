import { useGetNumbers } from '@/source/home/_api/get-number'
import CreateNumberForm from '@/source/home/_components/CreateNumberForm'
import { NumberList } from '@/source/home/_components/NumberList'

function Page() {
  useGetNumbers()
  return (
    <div>
      <h1>数字管理</h1>
      <CreateNumberForm />
      <hr />
      <NumberList />
    </div>
  )
}

export default Page
