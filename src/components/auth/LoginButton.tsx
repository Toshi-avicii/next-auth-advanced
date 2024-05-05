'use client';
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
}

function LoginButton({
    children,
    mode = 'redirect',
    asChild
}: LoginButtonProps) {
    const router = useRouter();
    const clickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        router.push('/auth/login');
    }

    if (mode === 'modal') {
        return (
            <span>Todo: Implement modal</span>
        )
    }
    return (
        <span className="cursor-pointer" onClick={clickHandler}>
            {children}
        </span>
    )
}

export default LoginButton
