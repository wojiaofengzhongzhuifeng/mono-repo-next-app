import { userInfo } from 'os'
import {
  useGetUserInfo,
  useGetUserInfoHooks,
} from '../../_hooks/getUserInfoHooks'

function GetUserInfo() {
  useGetUserInfo()
  useGetUserInfoHooks()
  console.log(userInfo)
  return (
    <>
      <div>1</div>
    </>
  )
}
export default GetUserInfo
