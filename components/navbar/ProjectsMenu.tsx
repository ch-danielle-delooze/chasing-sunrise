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
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectsMenu;
