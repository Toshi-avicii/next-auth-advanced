'use client';

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
    label: string;
    href: string;
}

function BackButton({ label, href }: BackButtonProps) {
  return (
    <Button asChild variant="link" className="font-normal w-full" size="sm">
        <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton
