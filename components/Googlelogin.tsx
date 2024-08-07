"use client";
import { FaGoogle } from "react-icons/fa";
import { createBrowserClient } from "@supabase/ssr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
const Goggleloginbutton = () => {
  const [load, setload] = useState<boolean>(false);
  const loginWithGitHub = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    setload(true);
    try {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Sign-in error:", (error as Error).message);
      } else {

        // Handle redirection after successful sign-in if needed
        redirect("/api/callback2");
      }
    } catch (error) {
      console.error("Sign-in error:", (error as Error).message);
    } finally {
      setload(true);
    }
  };

  return (
    <Button
      className="border border-foreground/20 rounded-md px-4 py-2 text-foreground text-black mb-2 w-full flex items-center gap-4"
      onClick={loginWithGitHub}
    >
      Sign in with Google <FaGoogle />{" "}
      <AiOutlineLoading3Quarters className={load ? "animate-spin" : "hidden"} />
    </Button>
  );
};

export default Goggleloginbutton;
