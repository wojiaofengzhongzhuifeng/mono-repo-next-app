import { userInfo } from 'os'
import { useGetUserInfo } from '../../_hooks/getUserInfoHooks'

function GetUserInfo() {
  useGetUserInfo()
  console.log(userInfo)
  return (
    <>
      <div>1</div>
    </>
  )
}
export default GetUserInfo
