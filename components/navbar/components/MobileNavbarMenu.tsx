"use client";
import { NavbarMenuItem, NavbarMenu } from "@heroui/navbar";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation'

import { link as linkStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { subtitle } from "@/components/primitives";
import { formatFolderName } from "@/app/utils/string";
import { useGetFolders } from "@/app/requests/folders";

interface MobileNavbarMenuProps {
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileNavbarMenu = ({ setIsMenuOpen}: MobileNavbarMenuProps) => {
  const { data: folders } = useGetFolders();

  const pathName = usePathname();

  const closeNavBarMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <NavbarMenu>
      <div className="mx-4 mt-2 flex flex-col gap-2">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                pathName === item.href ? "font-bold" : "",
              )}
              color="foreground"
              href={item.href}
              onClick={closeNavBarMenu}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem className="flex flex-col space-y-2">
          <span className={subtitle()}>Projects</span>
          <Divider />
          {folders?.map((folder) => {
            const href = `/projects/${folder.name}`;
            return (
              <Link
                key={folder.name}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  pathName === href ? "font-bold" : "",
                )}
                color="foreground"
                href={href}
                onClick={closeNavBarMenu}
              >
                {formatFolderName(folder.name)}
              </Link>
            )
          })}
        </NavbarMenuItem>
      </div>
    </NavbarMenu>
  );
};

export default MobileNavbarMenu;
