interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen flex justify-center items-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        { children }
    </div>
  )
}

export default AuthLayout
