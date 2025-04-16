import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo.png"; 

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const NavBar = ({
  logo = {
    src: logoImage, 
    alt: "FlowBoard",
    title: "FlowBoard",
    url: "/",
  },
  menu = [
    { title: "About", url: "#" },
    { title: "Contact", url: "#" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
}) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    Cookies.remove('token', { path: '/' });
    navigate('/login');
};

  return (
    <section className="py-4">
      <div className="w-full px-4 sm:px-8">
        <nav className="hidden justify-between lg:flex lg:justify-between">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} alt={logo.alt} className="max-h-8" />
              <span
                className="text-lg font-semibold tracking-tighter cursor-pointer"
                onClick={() => navigate("/")}
              >
                {logo.title}
              </span>
            </a>
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(auth.login.url)}>
              {auth.login.title}
            </Button>
            <Button size="sm" onClick={() => navigate(auth.signup.url)}>
              {auth.signup.title}
            </Button>
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="max-h-8 sm:max-h-10 lg:max-h-8" 
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2 ">
                      <img 
                        src={logo.src} 
                        alt={logo.alt} 
                        className="max-h-8 sm:max-h-10 lg:max-h-8" 
                      />
                      <span className="text-lg font-semibold">{logo.title}</span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" onClick={() => navigate(auth.login.url)}>
                      {auth.login.title}
                    </Button>
                    <Button onClick={() => navigate(auth.signup.url)}>
                      {auth.signup.title}
                    </Button>
                    <Button onClick={handleLogOut}>
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};


const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }) => (
  <a
    href={item.url}
    className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
  >
    <div className="text-foreground">{item.icon}</div>
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-sm leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  </a>
);
