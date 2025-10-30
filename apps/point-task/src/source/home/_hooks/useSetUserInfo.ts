import { useEffect } from "react";
import { useAppStore } from "../_store";

function useSetUserInfo() {
    const setUserInfo = useAppStore(state => state.setUserInfo)

    useEffect(()=>{
        
        setUserInfo({ 
            user_id: "user001",
            nickname: "",   
            created_at: "",
            id: 0,
            totalPoints: 0
         })
    }, [])
}
export default useSetUserInfo