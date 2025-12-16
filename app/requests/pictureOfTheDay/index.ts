"use client";
import useSWR, { SWRResponse } from "swr";

export interface PictureOfTheDayObject {
  key: string;
  lastModified?: string;
  size?: number;
  metadata?: Record<string, string>;
}

export function useGetPictureOfTheDay(): SWRResponse<
  PictureOfTheDayObject,
  Error
> {
  const url = "/api/picture-of-the-day";
  const resp: SWRResponse<PictureOfTheDayObject, Error> = useSWR(url, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (resp.error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching picture of the day:", resp.error);
  }

  return resp;
}
