"use client";
import { NavbarMenuItem, NavbarMenu } from "@heroui/navbar";
import { Divider } from "@heroui/divider";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { link as linkStyles } from "@heroui/theme";
import { subtitle } from "@/components/primitives";

import { useGetFolders } from "@/app/requests/folders";

const MobileNavbarMenu = () => {
  const {data: folders } = useGetFolders();
  console.log(folders)

  return (
    <NavbarMenu>
    <div className="mx-4 mt-2 flex flex-col gap-2">
      {siteConfig.navMenuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </NextLink>
        </NavbarMenuItem>
      ))}

      <NavbarMenuItem>
        <span className={subtitle()}>Projects</span>
        <Divider />
        {folders?.map((folder) => (
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href={`projects/${folder.name}`}
            key={folder.name}
          >
            {folder.name}
          </NextLink>
        ))}
      </NavbarMenuItem>
    </div>
  </NavbarMenu>
  );
};

export default MobileNavbarMenu;