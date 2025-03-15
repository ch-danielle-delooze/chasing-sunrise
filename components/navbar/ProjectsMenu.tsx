"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";

import { useGetFolders } from "@/app/requests/folders";

const ProjectsMenu = () => {
  const { data } = useGetFolders();
  const router = useRouter();
  console.log(data)

  const formatFolderName = (name: string) => {
    return name.replace(/-/g, " ").split(" ").map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <button>Projects</button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={data}>
        {(item) => (
          <DropdownItem
            key={item.name}
            onPress={() => router.push(`/projects/${item.name}`)}
          >
            {formatFolderName(item.name)}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectsMenu;
