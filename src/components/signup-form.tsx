import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { checkHaveAccount } from "@/context/context";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showSignPassword, setShowSignPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let account = useContext(checkHaveAccount);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
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
            id="username"
            type="text"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={!showSignPassword ? "password" : "text"}
              placeholder="Enter your password"
              required
            />
            {!showSignPassword ?
                <Eye onClick={() => setShowSignPassword(true)} size={20} className="absolute top-[8px] right-[10px]"></Eye> :
                <EyeOff onClick={() => setShowSignPassword(false)} size={20} className="absolute top-[8px] right-[10px]"></EyeOff>
            }
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <div className="relative">
            <Input
              id="confirm-password"
              type={!showConfirmPassword ? "password" : "text"}
              placeholder="Confirm your password"
              required
            />
            {!showConfirmPassword ?
                <Eye onClick={() => setShowConfirmPassword(true)} size={20} className="absolute top-[8px] right-[10px]"></Eye> :
                <EyeOff onClick={() => setShowConfirmPassword(false)} size={20} className="absolute top-[8px] right-[10px]"></EyeOff>
            }
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
