import useSWR, { SWRResponse } from "swr";

export function useGetImage(params: {
  key: string;
}): SWRResponse<string, Error> {
  const url = `/api/images?key=${params.key}`;
  const resp: SWRResponse<string, Error> = useSWR(url, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (resp.error) {
    console.error("Error fetching image:", resp);
  }

  return resp;
}