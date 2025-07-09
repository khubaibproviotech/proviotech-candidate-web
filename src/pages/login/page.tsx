import { GalleryVerticalEnd } from "lucide-react";
import PROVIOTECH from "../../assets/proviotech.png";
import { SignupForm } from "@/components/signup-form";
import { useState, useEffect, useContext } from "react";
import * as motion from "motion/react-client";
import { useAnimate } from "motion/react";
import { LoginForm } from "@/components/login-form";
import useMediaQuery from "@/hooks/media";
import { checkHaveAccount } from "@/context/context";

export default function LoginPage() {

  
  const [scope, animate] = useAnimate();

  const [isMyLoading, setIsMyLoading] = useState(true);

  const [myMedia, setMyMedia] = useState(false);

  const account = useContext(checkHaveAccount);

   useEffect(() => {
    if(scope.current) {
    if (account?.haveAccount) {
      animate(scope.current, { left: 0 });
    } else {
      animate(scope.current, { left: "50%" });
    }
  }
  }, [account?.haveAccount])


  const media = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (media) {
      setMyMedia(true);
    } else {
      setMyMedia(false);
    }
    setTimeout(() => {
      setIsMyLoading(false)
    }, 3000)
  }, [media]);

  return isMyLoading ? <div className="w-full h-svh flex justify-center items-center">
    <img className="w-1/2 animate-pulse" src={PROVIOTECH} alt="proviotech-logo" />
  </div> : !myMedia ? (
    <div className="grid min-h-svh lg:grid-cols-2 w-full relative">
      <motion.div
        ref={scope}
        className={`bg-muted absolute z-10 w-1/2 h-full hidden lg:block`}
      >
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
  ) : (
    <div className="flex flex-col gap-4 p-6 md:p-10 w-full h-svh ">
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
          {account?.haveAccount ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}
