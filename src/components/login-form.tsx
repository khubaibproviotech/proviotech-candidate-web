import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { checkHaveAccount, Admin } from "@/context/context";
import { Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  

  //  State
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);


  const [showLoginPassword, setShowLoginPassword] = useState(false);

  //  Context
  let account = useContext(checkHaveAccount);

  let admin = useContext(Admin)
  


  //  Check Username
  // const checkUsername = (e : any) => {
  //   if (e.target.value.length < 3 && e.target.value != "") {
  //     setNameError(true)
  //   } else {
  //     setNameError(false)
  //   }
  // }

  //   Check Password
  // const checkPassword = (e: any)  => {
  //   if (e.target.value.length < 8 && e.target.value != "") {
  //     setPassError(true);
  //   } else {
  //     setPassError(false);
  //   }
  //   setPassword(e.target.value)
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setNameError(false);
    setPassError(false);
    try {
      let data = await fetch("http://localhost:3333/api/admin/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body : JSON.stringify({
          username: userName,
          password: password
        })
      })
      let obj = await data.json()
      console.log(obj, "data")
      if (obj.data == "no account registered") {
        setNameError(true)
      } else if (obj.data == "incorrect password") {
        setPassError(true)
      } else {
        toast("✔ Login successfull")
        Cookies.set("auth", obj.data.auth)
        setUserName("")
        setPassword("")
        admin?.setAdmin(true)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(admin?.admin, "login")
  }, [admin?.admin])
  

//   JSX
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={cn("flex flex-col gap-6", className)} {...props}>
    <Toaster></Toaster>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username-login">Username</Label>
          <Input
          onChange={(e) => setUserName(e.target.value)}
          className={nameError ? `border border-red-400 focus:border-red-400` : ``}
            id="username-login"
            type="text"
            value={userName}
            placeholder="Enter your username"
            required
          />
          {nameError ? <div className="text-sm text-red-400">username not registered</div> : <></>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password-login">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
            onChange={(e) => setPassword(e.target.value)}
            className={passError ? `border border-red-400 focus:border-red-400` : ``}
              id="password-login"
              value={password}
              type={!showLoginPassword ? "password" : "text"}
              placeholder="Enter your password"
              required
            />
            {!showLoginPassword ? (
              <Eye onClick={() => setShowLoginPassword(true)} size={20} className="absolute top-[8px] right-[10px]"></Eye>
            ) : (
              <EyeOff
              onClick={() => setShowLoginPassword(false)}
                size={20}
                className="absolute top-[8px] right-[10px]"
              ></EyeOff>
            )}
          </div>
          {passError ? <div className="text-sm text-red-400">invalid password</div> : <></>}
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative px-2">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a
          onClick={() => account?.setHaveAccount(false)}
          className="underline underline-offset-4 cursor-pointer hover:text-orange-400"
        >
          Sign up
        </a>
      </div>
    </form>
  );
}
