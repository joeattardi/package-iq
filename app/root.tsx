import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@vercel/remix";
import clsx from 'clsx';

import styles from "./index.css";
import { Package } from '@phosphor-icons/react';
import Header from './components/Header';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const [params] = useSearchParams();
  const navigation = useNavigation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
