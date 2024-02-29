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
  useSearchParams,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction } from "@vercel/remix";

import styles from "./index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const [params] = useSearchParams();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="bg-slate-800 text-white flex items-center justify-between p-4">
          <h1 className="text-3xl">
            <Link to="/">Package IQ</Link>
          </h1>

          <Form className="ml-4" action="/search" role="search">
            <input 
              type="search" 
              className="bg-slate-500 w-full px-2 py-1 rounded text-white" 
              id="q"
              name="q"
              placeholder="Search packages..."
              defaultValue={params.get('q') || ''}
            />
          </Form>
        </header>
        <main className="p-4"><Outlet /></main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
