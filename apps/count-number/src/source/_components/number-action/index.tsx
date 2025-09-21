import React, {useEffect} from "react";
import {useGetCountNumber} from "@/source/_hooks/useGetCountNumber";
import { Button } from "@/components/ui/button"


function NumberAction({data}: {data: number}){
    const {data: testData} = useGetCountNumber()
    console.log('testData', testData)
    console.log('data', data)
    const test = ()=>{
        console.log(111)
    }
    return (
        <div>
            <Button onClick={test}>test</Button>
        </div>
    )
}
export default NumberAction