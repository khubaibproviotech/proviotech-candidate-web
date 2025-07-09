import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState} from "react";
import { checkHaveAccount, Admin } from "@/context/context";
import { Eye, EyeOff } from "lucide-react";


//  Signup Component
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  //    States
  const [showSignPassword, setShowSignPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState(false);

  // Admin Context

  const admin = useContext(Admin);

  // Account Context

  let account = useContext(checkHaveAccount);

  // Check Username Valid

  const checkUsername = (e: any) => {
    if (e.target.value.length < 3 && e.target.value != "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setUserName(e.target.value);
  };

  // Check Password Valid
  const checkPassword = (e: any) => {
    if (e.target.value.length < 8 && e.target.value != "") {
      setPassError(true);
    } else {
      setPassError(false);
    }
    setPassword(e.target.value);
  };

  // Check Confirm Password Valid

  const checkConfirm = (e: any) => {
    if (e.target.value !== password && e.target.value != "") {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!nameError && !passError && !confirmError) {
      let res = await fetch("http://localhost:3333/api/admin", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body : JSON.stringify({
          username: userName,
          password: password
        })
      })
      setUserName("");
      setPassword("");
      
    }
  }

  // JSX

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to Create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => checkUsername(e)}
            className={nameError ? `border border-red-400 focus:!border-red-400` : ``}
            id="username"
            type="text"
            placeholder="Enter your username"
            value={userName}
            required
          />
          {nameError ? (
            <div id="error-username" className="text-sm text-red-400">
              minimum 3 character required
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
            className={passError ? `border border-red-400 focus:!border-red-400` : ``}
            onChange={(e) => checkPassword(e)}
              id="password"
              value={password}
              type={!showSignPassword ? "password" : "text"}
              placeholder="Enter your password"
              required
            />
            { passError ? <div className="text-sm text-red-400">minimum 8 character required</div> : <></>}
            {!showSignPassword ? (
              <Eye
                onClick={() => setShowSignPassword(true)}
                size={20}
                className="absolute top-[8px] right-[10px]"
              ></Eye>
            ) : (
              <EyeOff
                onClick={() => setShowSignPassword(false)}
                size={20}
                className="absolute top-[8px] right-[10px]"
              ></EyeOff>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <div className="relative">
            <Input
            className={passError || confirmError ? `border border-red-400 focus:!border-red-400` : ``}
            onChange={(e) => !passError ? checkConfirm(e) : null}
              id="confirm-password"
              value={confirmPassword}
              type={!showConfirmPassword ? "password" : "text"}
              placeholder="Confirm your password"
              required
            />
            <div className="text-sm text-red-400">
              {!passError ? confirmError ? "password doesn't match" : "" :  "minimum 8 characters required"}
            </div>
            {!showConfirmPassword ? (
              <Eye
                onClick={() => setShowConfirmPassword(true)}
                size={20}
                className="absolute top-[8px] right-[10px]"
              ></Eye>
            ) : (
              <EyeOff
                onClick={() => setShowConfirmPassword(false)}
                size={20}
                className="absolute top-[8px] right-[10px]"
              ></EyeOff>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative px-2">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a
          onClick={() => account?.setHaveAccount(true)}
          className="underline underline-offset-4 cursor-pointer hover:text-orange-400"
        >
          Login
        </a>
      </div>
    </form>
  );
}
