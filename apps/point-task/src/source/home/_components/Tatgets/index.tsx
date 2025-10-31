import React from "react";
import { useAppStore } from "../../_store"

function Targets() {
    const { userTargets,setUserTargets } = useAppStore()
    console.log('userTargets',userTargets);
    return (<>
    <div>
        Targets place
        <div>{userTargets.map((item)=>{
            return (<>
            <div>{item.name}</div>
            </>)
        })}</div>
    </div>
    </>)

}
export default Targets