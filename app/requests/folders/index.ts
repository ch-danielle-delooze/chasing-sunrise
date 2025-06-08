"use client";
import useSWR, { SWRResponse } from "swr";

import { Folder } from "@/types";

export function useGetFolders(): SWRResponse<Folder[], Error> {
  const url = "/api/folders";
  const resp: SWRResponse<Folder[], Error> = useSWR(url, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (resp.error) {
    console.error("Error fetching folders:", resp.error);
  }
  console.log(resp.data, "folders data");

  return resp;
}
