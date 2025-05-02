import { Star } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import manincoat from "../../assets/manincoat.jpg";
import girl from "../../assets/girl.jpg";

export const LandingPage = () => {
  const navigate = useNavigate();
  const heading = "Welcome to FlowBoard";
  const description =
    "FlowBoard is your modern, minimalist task manager built for clarity and control. Whether you're a student managing deadlines, a team collaborating on a project, or just someone trying to stay on top of your day — FlowBoard makes it effortless.";
  const button = {
    text: "Get Started",
  };
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 md:py-32">
        <div className="w-full px-4 sm:px-8">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
            <h1 className="text-3xl font-extrabold lg:text-6xl text-center">{heading}</h1>
            <p className="text-balance text-muted-foreground lg:text-lg text-center">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="mt-10" onClick={() => navigate("/signup")}>
              {button.text}
            </Button>
          </div>
  
        </div>
      </section>
    </div>
  );
};
