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
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";


function Menulist() {
    const path = usePathname()
    return (
        <div className="flex flex-col  gap-4 w-fullt ">
            <Button
                variant="ghost"
                className={path === "/dashboard" ? "bg-accent" : ""}

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
                className={path === "/dashboard/chat" ? "bg-accent" : ""}>

                <Link
                    href="/dashboard/chat"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <ChatBubbleIcon />
                    Conversation
                </Link>{" "}
            </Button>
            <Button variant="ghost"
                className={path === "/dashboard/music" ? "bg-accent" : ""}>

                <Link
                    href="/dashboard/music"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <PlayIcon />
                    Music generator
                </Link>
            </Button >
            <Button variant="ghost"
                className={path === "/dashboard/image" ? "bg-accent" : ""}>

                <Link
                    href="/dashboard/image"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <ImageIcon /> Image Generator{" "}
                </Link>{" "}
            </Button >

            <Button variant="ghost"
                className={path === "/dashboard/code" ? "bg-accent" : ""}>

                <Link
                    href="/dashboard/code"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <CodeIcon />
                    Code Generator
                </Link>{" "}
            </Button >
            <Button variant="ghost"
                className={path === "/dashboard/settings" ? "bg-accent" : ""}>

                <Link
                    href="/dashboard/settings"
                    className=" w-full text-start flex items-center gap-3"
                >
                    <GearIcon />
                    Setings
                </Link>{" "}
            </Button >
        </div >
    );
}

export default Menulist;
