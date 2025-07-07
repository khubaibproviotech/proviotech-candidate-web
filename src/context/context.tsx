import { createContext, type SetStateAction } from "react";
import React from "react";


interface CheckHaveAccounttype {
    haveAccount: boolean,
    setHaveAccount: React.Dispatch<SetStateAction<boolean>> 
}

let checkHaveAccount = createContext<undefined | CheckHaveAccounttype>(undefined)


export {
    checkHaveAccount,
}