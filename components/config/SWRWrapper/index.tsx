"use client";
import { SWRConfig } from "swr";

const SWRWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          // @ts-ignore
          const resp = await fetch(...args);
          if (!resp.ok) {
            console.error(`${resp.status} - ${resp.statusText}`);
            return {};
          }
          const respJson = await resp.json();
          return respJson;
        }
      }}
    >
      {children}
    </SWRConfig>
  );
};
export default SWRWrapper;
