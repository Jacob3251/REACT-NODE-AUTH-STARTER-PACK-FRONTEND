import { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-[100vh] w-full fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default AuthLayout;
