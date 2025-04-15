import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "../../assets/logo.png";
import { title } from "process";
import { href } from "react-router-dom";

export const SignUpPage = () => {
  const heading = "Signup";
  const subheading = "Create a new account";
  const logo = {
    src: logoImage,
    alt: "logo",
    title: "FlowBoard",
  };
  const signupText = "Sign up";
  const loginText = "Already have an account?";
  const loginUrl = "/login";

  return (
    <section className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl border border-muted px-8 py-10">
        <div className="flex flex-col items-center gap-y-3 mb-8">
          <a href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} alt={logo.alt} title={logo.title} className="h-10" />
            <span
              className="text-3xl font-semibold tracking-tighter cursor-pointer"
              onClick={() => navigate("/")}
            >
              {logo.title}
            </span>
          </a>
          <h1 className="text-3xl font-bold">{heading}</h1>
          {subheading && (
            <p className="text-sm text-muted-foreground text-center">{subheading}</p>
          )}
        </div>
        <form className="flex flex-col gap-6">
          <div className="flex gap-4">
            <Input type="text" placeholder="First Name" required className="bg-white w-1/2" />
            <Input type="text" placeholder="Last Name" required className="bg-white w-1/2" />
          </div>
          <Input type="Email" placeholder="Email" required className="bg-white" autoComplete="off" />
          <Input type="password" placeholder="Password" required className="bg-white" autoComplete="new-password" />
          <Input type="password" placeholder="Confirm Password" required className="bg-white" />

          <Button type="submit" className="w-full">
            {signupText}
          </Button>
        </form>
        <div className="mt-6 text-sm text-muted-foreground text-center">
          <span>{loginText} </span>
          <a href={loginUrl} className="text-primary font-medium hover:underline">
            Login
          </a>
        </div>
      </div>
    </section>
  );
};
