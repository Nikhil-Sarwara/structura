const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="max-w-md w-full">{children}</div>
        </div>
    )
}

export default LoginLayout;

