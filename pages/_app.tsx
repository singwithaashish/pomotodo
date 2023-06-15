import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppStateProvider } from "@/components/context/appStateContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AppStateProvider>
        <Component {...pageProps} />
      </AppStateProvider>
    </UserProvider>
  );
}
