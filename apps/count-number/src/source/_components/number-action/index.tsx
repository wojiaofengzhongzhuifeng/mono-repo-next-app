import React, {useEffect} from "react";
import {useGetCountNumber} from "@/source/_hooks/useGetCountNumber";

function NumberAction({data}: {data: number}){
    const {data: testData} = useGetCountNumber()
    console.log('testData', testData)
    console.log('data', data)
    return (
        <div>number action</div>
    )
}
export default NumberAction