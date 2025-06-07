"use client";
import { useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { title } from "../primitives";

import MobileNavbarMenu from "./components/MobileNavbarMenu";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import ProjectsMenu from "@/components/navbar/components/ProjectsMenu";
import { InstagramIcon, GithubIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

const IconActions = () => {
  return (
    <>
      <Link isExternal aria-label="Github" href={siteConfig.links.github}>
        <GithubIcon className="text-default-500" />
      </Link>
      <Link isExternal aria-label="Instagram" href={siteConfig.links.instagram}>
        <InstagramIcon className="text-default-500" />
      </Link>
      <ThemeSwitch />
    </>
  );
};

export const Navbar = () => {
  const path = window.location.pathname
  const defaultTab = path.indexOf("/", 1) === -1 ? path : path.slice(0, path.indexOf("/", 1));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(defaultTab);

  return (
    <HeroUINavbar isMenuOpen={isMenuOpen} maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <span className={clsx(title({ size: "md" }), "md:-mt-3 -mt-2")}>
              Chasing Sunrise
            </span>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  selectedTab === item.href ? "font-medium" : "text-gray-500",
                )}
                color="foreground"
                href={item.href}
                onClick={() => setSelectedTab(item.href)}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
          <NavbarItem>
            <ProjectsMenu
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <IconActions />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <IconActions />
        <NavbarMenuToggle onChange={(isOpen) => setIsMenuOpen(isOpen)} />
        <MobileNavbarMenu setIsMenuOpen={setIsMenuOpen} />
      </NavbarContent>
    </HeroUINavbar>
  );
};
