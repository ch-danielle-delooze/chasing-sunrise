"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { useGetFolders } from "@/app/requests/folders";

const ProjectsMenu = () => {
  const { data } = useGetFolders();

  console.log(data);

  return (
    <Dropdown>
      <DropdownTrigger>
        <button>Projects</button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={data}>
        {(item) => <DropdownItem key={item.name}>{item.name}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectsMenu;
