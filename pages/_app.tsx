import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppStateProvider } from "@/components/context/appStateContext";
import Layout from "@/components/layout/Layout";
import MyHeader from "@/components/layout/MyHeader";
import MyNavBar from "@/components/layout/MyNavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AppStateProvider>
        <Layout>
          <MyHeader />
          <Component {...pageProps} />
          <MyNavBar/>
        </Layout>
      </AppStateProvider>
    </UserProvider>
  );
}
