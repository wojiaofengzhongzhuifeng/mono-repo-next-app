import React, {useEffect} from "react";
import {get} from "@mono-repo/utils/src";

function NumberAction({data}: {data: number}){
    useEffect(() => {
        console.log(123321);

        async function getData(){
            const response = await get<{ count: number }>({
                url: '/api/get-count'
            })
            console.log('response', response)
        }
        getData()
    }, []);
    return (
        <div>number action: {data}</div>
    )
}
export default NumberAction