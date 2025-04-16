import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "../../assets/logo.png";
import { useLoginUser } from "../../hooks/useUserAuth/useLogin/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../components/YupValidation/index"; 
import { useNavigate } from "react-router-dom";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const navigate = useNavigate();
  const { loginUser, isUserLoginLoading } = useLoginUser();

  const onSubmit = (data) => {
    loginUser(
      { email: data.email, password_hash: data.password },
      {
        onSuccess: () => navigate("/home"),
      }
    );
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="h-11"
              autoComplete="off"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="h-11"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full h-11">
            {isUserLoginLoading ? "Logging in..." : loginText}
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
