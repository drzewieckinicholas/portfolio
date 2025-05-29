import './tailwind.css';

import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { useEffect } from 'react';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Karla:ital,wght@0,200..800;1,200..800&display=swap',
  },
];

export const loader = async () => {
  return {
    GTM_CONTAINER_ID: process.env.GTM_CONTAINER_ID,
  };
};

let isGoogleTagManagerScriptAdded = false;

function addGoogleTagManagerScript(GTM_CONTAINER_ID: string) {
  if (!GTM_CONTAINER_ID || isGoogleTagManagerScriptAdded) {
    return;
  }

  (function (w: Window, d: Document, s: 'script', l: string, i: string) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode?.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_CONTAINER_ID);

  isGoogleTagManagerScriptAdded = true;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { GTM_CONTAINER_ID } = useLoaderData<typeof loader>();

  useEffect(() => {
    addGoogleTagManagerScript(GTM_CONTAINER_ID!);
  }, [GTM_CONTAINER_ID]);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='mx-auto w-[min(100%-2rem,60ch)] bg-neutral-800 text-neutral-100'>
        <noscript>
          <iframe
            height='0'
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            style={{ display: 'none', visibility: 'hidden' }}
            title='Google Tag Manager'
            width='0'
          ></iframe>
        </noscript>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
