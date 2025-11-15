import { useGetUserInfoHooks } from '@/source/home/_api/getUserInfo'
import { useAppStore } from '../../_store'

function GetUserInfo() {
  const { userInfo } = useAppStore()
  useGetUserInfoHooks()

  console.log(userInfo)
  return (
    <>
      <div>1</div>
    </>
  )
}
export default GetUserInfo
