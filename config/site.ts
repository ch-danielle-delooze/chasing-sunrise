export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Chasing Sunrise",
  description:
    "Photography website for viewing and downloading pictures from Kash Desai",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/ch-danielle-delooze/chasing-sunrise",
    instagram: "https://www.instagram.com/kash__desai"
  },
};
