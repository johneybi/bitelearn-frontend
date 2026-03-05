import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className="mx-auto min-h-dvh w-full max-w-app bg-white">
        <Outlet />
      </div>
    </div>
  );
}
