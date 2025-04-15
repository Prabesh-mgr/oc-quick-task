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

      <section className=" py-16 md:py-24 dark:bg-gray-800">
        <div className="w-full sm:px-8 space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">About Us</h1>
              <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We're on a mission to help teams build, deploy, and manage tasks effectively.
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center flex-col lg:flex-row gap-8 ">
            <div className="flex flex-col items-center justify-between space-y-2 text-center lg:items-start lg:space-y-4 lg:text-left shadow p-5 rounded-lg">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-3xl/relaxed lg:text-4xl xl:text-5xl">
                  Our Story
                </h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Founded in 2020, FlowBoard started as a small team of developers with a big idea: to make task management
                  more accessible and enjoyable for everyone. Over the years, we've grown into a platform
                  that powers task management for thousands of teams and individuals.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center lg:items-start lg:space-y-4 lg:text-left shadow p-5 rounded-lg">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-3xl/relaxed lg:text-4xl xl:text-5xl">
                  Our Mission
                </h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We believe in the power of efficient task management to organize, inspire, and transform. Our mission is to empower
                  teams and individuals by providing simple yet powerful tools that enable you to accomplish more with less effort.
                </p>
              </div>
            </div>
          </div>
          <div className="grid max-w-sm gap-8 mx-auto items-start sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <img
                src={girl}
                alt="Team member"
                className="mx-auto rounded-full overflow-hidden aspect-square object-cover object-center border border-gray-200 dark:border-gray-800"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Alice Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <img
                src={manincoat}
                alt="Team member"
                className="mx-auto rounded-full overflow-hidden aspect-square object-cover object-center border border-gray-200 dark:border-gray-800"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Alice Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <img
                src={manincoat}
                alt="Team member"
                className="mx-auto rounded-full overflow-hidden aspect-square object-cover object-center border border-gray-200 dark:border-gray-800"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Bob Smith</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <img
                src={girl}
                alt="Team member"
                className="mx-auto rounded-full overflow-hidden aspect-square object-cover object-center border border-gray-200 dark:border-gray-800"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Ella Brown</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">UX Designer</p>
              </div>
            </div>
          </div>
          <div className="grid max-w-sm gap-4 mx-auto items-start sm:max-w-4xl sm:grid-cols-1 md:gap-8 lg:max-w-5xl lg:grid-cols-1">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h3 className="text-2xl font-semibold">Contact Us</h3>
              <address className="text-base not-italic">225 Bush St, San Francisco, CA 94104</address>
              <a
                href="tel:+14155552671"
                className="text-base underline underline-offset-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                +1 (415) 555-2671
              </a>
              <div className="flex items-center space-x-2 text-base">
                <Link
                  to="mailto:info@flowboard.com"
                  className="underline underline-offset-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  info@flowboard.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
