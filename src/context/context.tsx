import { createContext, type SetStateAction } from "react";
import React from "react";

interface CheckHaveAccounttype {
  haveAccount: boolean;
  setHaveAccount: React.Dispatch<SetStateAction<boolean>>;
}

interface AdminType {
  admin: boolean
  setAdmin: React.Dispatch<SetStateAction<boolean>>
}

let checkHaveAccount = createContext<null | CheckHaveAccounttype>(null);

let Admin = createContext<null | AdminType>(null);

export { checkHaveAccount, Admin };
