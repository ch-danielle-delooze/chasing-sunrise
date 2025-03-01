
import useSWR from "swr";

export function useGetFolders() {
  const url = "/api/folders";
  const resp = useSWR(url);
  if (resp.error) {
    console.error("Error fetching folders:", resp.error);
  }
  return resp;
}