import React from "react";
import { useAppStore } from "../../_store"

function Banner() {
    const {userInfo} = useAppStore()
    console.log("Banner userInfo:", userInfo);
    return <div>Banner Component</div>

}
export default Banner