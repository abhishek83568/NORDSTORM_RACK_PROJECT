import { FETCHDATAERROR, FETCHDATAREQUEST, FETCHDATASUCCESS } from "./actionTypes"

export const loadingAction=()=>{
    return {type:FETCHDATAREQUEST}
}

export const errorAction=()=>{
    return {type:FETCHDATAERROR}
}

export const successAction=(data)=>{
    return {type:FETCHDATASUCCESS,payload:data}
}

export const fetchData=(url)=>async(dispatch)=>{
try {
    dispatch(loadingAction())

    const response=await fetch(url);
    const data=await response.json();

    dispatch(successAction(data.product))
} catch (error) {
    dispatch(errorAction())
}
}