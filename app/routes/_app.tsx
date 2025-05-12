import { Outlet } from '@remix-run/react';

export default function App() {
  return (
    <>
      <nav>Nav</nav>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
