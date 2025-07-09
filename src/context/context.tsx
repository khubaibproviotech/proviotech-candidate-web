import { createContext, type SetStateAction } from "react";
import React from "react";

interface CheckHaveAccounttype {
  haveAccount: boolean;
  setHaveAccount: React.Dispatch<SetStateAction<boolean>>;
}

interface AdminType {
  admin: { username: string; password: string; __id: string } | null;
  setAdmin: React.Dispatch<SetStateAction<{username: string, password : string, __id: string }>> | React.Dispatch<SetStateAction<null>>
}

let checkHaveAccount = createContext<null | CheckHaveAccounttype>(null);

let Admin = createContext<null | AdminType>(null);

export { checkHaveAccount, Admin };
