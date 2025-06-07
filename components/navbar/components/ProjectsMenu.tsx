"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

import { useGetFolders } from "@/app/requests/folders";
import { formatFolderName } from "@/app/utils/string";

interface ProjectsMenuProps {
  setSelectedTab: (tab: string) => void;
  selectedTab?: string | null;
}

const ProjectsMenu = ({ setSelectedTab, selectedTab }: ProjectsMenuProps) => {
  const { data } = useGetFolders();
  const router = useRouter();

  const openProject = (projectPath: string) => {
    setSelectedTab("/projects");
    router.push(`/projects/${projectPath}`);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button
          className={clsx(
            selectedTab === "/projects" ? "font-medium" : "text-gray-500",
          )}
        >
          Projects
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={data}>
        {(item) => (
          <DropdownItem key={item.name} onPress={() => openProject(item.name)}>
            {formatFolderName(item.name)}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectsMenu;
