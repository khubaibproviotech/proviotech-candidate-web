import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { checkHaveAccount } from "@/context/context";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  let account = useContext(checkHaveAccount);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
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
            id="username-login"
            type="text"
            placeholder="Enter your username"
            required
          />
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
              id="password-login"
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
