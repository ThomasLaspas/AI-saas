"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    TokensIcon,
    ChatBubbleIcon,
    ImageIcon,
    VideoIcon,
    CodeIcon,
    PlayIcon,
    GearIcon,
    HamburgerMenuIcon,
    Cross1Icon
} from "@radix-ui/react-icons";
import { useState } from "react";
import ProgressCard from "./ProgressCard";
import { usePathname } from "next/navigation";
function Menulistmob({ dt }: { dt: any }) {
    // const [path, seturl] = useState<string>("/dashboard");
    const [mobile, setmobile] = useState<boolean>(true)
    const path = usePathname()

    const click = (name: string) => {
        setmobile(prev => !prev)

    }
    if (mobile) {
        return <div className="p-6 sm:hidden absolute">
            <Button variant='ghost' className="text-4xl" onClick={() => setmobile(prev => !prev)}><HamburgerMenuIcon /></Button>
        </div>
    }
    return (<div className='h-screen w-full bg-background shadow-lg shadow-primary sm:hidden absolute flex  flex-col px-3  py-6 justify-between ' >
        <Button variant='ghost' className="absolute top-6 " onClick={() => setmobile(prev => !prev)}><Cross1Icon /></Button>
        <Link href="/" className="font-logo sm:text-4xl text-xl text-primary hover:blur-sm flex  items-center justify-center ">
            Friday
        </Link>
        <div className="flex flex-col  gap-4 w-fullt ">
            <Button
                variant="ghost"
                className={path === "/dashboard" ? "bg-accent" : ""}
                onClick={() => click("/dashboard")}
            >
                {" "}
                <Link
                    href="/dashboard"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <TokensIcon />
                    Dashboard
                </Link>{" "}
            </Button>
            <Button variant="ghost"
                className={path === "/dashboard/chat" ? "bg-accent" : ""}
                onClick={() => click("/dashboard/chat")}>
                <Link
                    href="/dashboard/chat"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <ChatBubbleIcon />
                    Conversation
                </Link>{" "}
            </Button>
            <Button variant="ghost"
                className={path === "/dashboard/music" ? "bg-accent" : ""}
                onClick={() => click("/dashboad/music")}>
                <Link
                    href="/dashboard/music"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <PlayIcon />
                    Music generator
                </Link>
            </Button>
            <Button variant="ghost"
                className={path === "/dashboard/image" ? "bg-accent" : ""}
                onClick={() => click("/dashboard/image")}>
                <Link
                    href="/dashboard/image"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <ImageIcon /> Image Generator{" "}
                </Link>{" "}
            </Button>

            <Button variant="ghost"
                className={path === "/dashboard/code" ? "bg-accent" : ""}
                onClick={() => click("/dashboard/code")}>
                <Link
                    href="/dashboard/code"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <CodeIcon />
                    Code Generator
                </Link>{" "}
            </Button>
            <Button variant="ghost"
                className={path === "/dashboard/settings" ? "bg-accent" : ""}
                onClick={() => click("/dashboard/settings")}>
                <Link
                    href="/dashboard/settings"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <GearIcon />
                    Settings
                </Link>{" "}
            </Button>
        </div>
        <ProgressCard dt={dt} />  </div>
    );
}

export default Menulistmob;
