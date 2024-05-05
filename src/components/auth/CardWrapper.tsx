'use client';

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./BackButton";
import Header from "./Header";
import Social from "./Social";

interface CWProps {
    children: React.ReactNode;
    headerLabel: string;
    backBtnLabel: string;
    backBtnHref: string;
    showSocial?: boolean;
}

function CardWrapper({ children, backBtnHref, backBtnLabel, headerLabel, showSocial }: CWProps) {
    return (
        <div>
            <Card className="w-[400px] shadow-md">
                <CardHeader>
                    <Header label={headerLabel} /> 
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                {
                    showSocial && (
                        <CardFooter>
                            <Social />
                        </CardFooter>
                    )
                }
                <CardFooter>
                    <BackButton label={backBtnLabel} href={backBtnHref} />
                </CardFooter>
            </Card>
        </div>
    )
}

export default CardWrapper
