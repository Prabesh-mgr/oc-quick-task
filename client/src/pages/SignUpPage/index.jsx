import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "../../components/YupValidation/index";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "../../assets/logo.png";
import { userSignUpUser } from "@/hooks/useUserAuth/useSignUp";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
  });

  const { addUsers, isUserLoading } = userSignUpUser();


  const onSubmit = async (data) => {
    const { confirmPassword, password, ...rest } = data;
    const formData = { ...rest, password };
  
    addUsers(formData, {
      onSuccess: () => {
        reset();
      },
    });
  };  

  const heading = "Signup";
  const subheading = "Create a new account";
  const logo = {
    src: logoImage,
    alt: "logo",
    title: "FlowBoard",
    url: "/", 
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="w-1/2">
              <Input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className="bg-white"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <Input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className="bg-white"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="bg-white"
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="bg-white"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="bg-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
          {isUserLoading ? "Signing Up..." : "Sign Up"}
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