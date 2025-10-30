import React from "react";
import { useAppStore } from "../../_store"

function Banner() {
    const {userInfo} = useAppStore()
    return <div>Banner Component: 当前用户id为 {userInfo?.user_id} 当前分数为{userInfo?.totalPoints}</div>

}
export default Banner