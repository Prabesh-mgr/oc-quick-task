import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "../../assets/logo.png";
import { title } from "process";

export const LoginPage = ({
  heading = "Login",
  subheading = "Welcome back",
  logo = {
    src: logoImage,
    alt: "flowboard",
    url: "#",
    title: "FlowBoard",
  },
  loginText = "Log in",
  signupText = "Don't have an account?",
  signupUrl = "/signup",
}) => {
  return (
    <section className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl border border-muted px-8 py-10">
            <div className="flex flex-col items-center mb-8">
              <a href={logo.url} className="mb-4 flex items-center">
                <img src={logo.src} className="h-10" alt={logo.alt} />
                <span
                  className="text-3xl font-semibold tracking-tighter cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  {logo.title}
                </span>
              </a>
              <h1 className="text-3xl font-bold">{heading}</h1>
              <p className="text-sm text-muted-foreground">{subheading}</p>
            </div>
            <form className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="h-11"
                autoComplete="off"
              />
              <Input
                type="password"
                placeholder="Enter your password"
                required
                className="h-11"
                autoComplete="new-password"
              />
              <Button type="submit" className="w-full h-11">
                {loginText}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <span>{signupText}</span>{" "}
              <a href={signupUrl} className="text-primary font-medium hover:underline">
                Sign up
              </a>
            </div>
      </div>
    </section>
  );
};
