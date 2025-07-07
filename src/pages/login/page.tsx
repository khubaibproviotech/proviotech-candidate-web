import { GalleryVerticalEnd } from "lucide-react";
import PROVIOTECH from "../../assets/proviotech.png";
import { SignupForm } from "@/components/signup-form";
import { useState, useEffect } from "react";
import { checkHaveAccount } from "@/context/context";
import * as motion from "motion/react-client";
import { useAnimate } from "motion/react";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {

  
  const [haveAccount, setHaveAccount] = useState(true);
  let [scope, animate] = useAnimate()

  useEffect(() => {
     if (haveAccount) {
      animate(scope.current, {left: 0})
    } else {
      animate(scope.current, {left: "50%"})
     }
  }, [haveAccount])
  




  return (
    <checkHaveAccount.Provider value={{haveAccount, setHaveAccount}}>
    <div className="grid min-h-svh lg:grid-cols-2 w-[100%] relative">
      <motion.div ref={scope} className={`bg-muted absolute z-10 w-1/2 h-full hidden lg:block
        `}>
          <img
            src={PROVIOTECH}
            alt="Image"
            className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale object-contain"
          />
        </motion.div>
      <div className="flex flex-col gap-4 p-6 md:p-10 w-full">
        <div className="flex justify-center gap-2 md:justify-start w-full">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            PROVIOTECH
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 w-full">
        <div className="flex justify-center gap-2 md:justify-start w-full">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            PROVIOTECH
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
    </checkHaveAccount.Provider>
  );
}
