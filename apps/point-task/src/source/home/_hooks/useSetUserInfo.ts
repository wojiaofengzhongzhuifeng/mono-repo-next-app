import { useEffect } from "react";
import { useAppStore } from "../_store";

function useSetUserInfo() {
    const setUserInfo = useAppStore(state => state.setUserInfo)

    useEffect(()=>{
        
        setUserInfo({ userId: "user001" })
    }, [])
}
export default useSetUserInfo