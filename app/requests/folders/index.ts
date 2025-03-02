import useSWR, { SWRResponse } from "swr";

import { Folder } from "@/types";

export function useGetFolders(): SWRResponse<Folder[], Error> {
  const url = "/api/folders";
  const resp: SWRResponse<Folder[], Error> = useSWR(url);

  if (resp.error) {
    console.error("Error fetching folders:", resp.error);
  }

  return resp;
}
