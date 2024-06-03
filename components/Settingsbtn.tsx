"use client";

interface Props {
  user: {
    free_tries: number;
    premium: boolean;
    stripe_customer_id: string
  },
  email: string | undefined
}
import React, { ChangeEvent, use, useTransition } from "react";
import { LightningBoltIcon } from "@radix-ui/react-icons";

import { usePathname } from "next/navigation";
import { checkout, manageBillingPortal } from "@/utils/Sapi";
import { Button } from "./ui/button";
function Settingsbtn({ user, email }: Props) {
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const handleCheckOut = () => {
    startTransition(async () => {
      const data = JSON.parse(
        await checkout(email!, location.origin + pathname)
      );
      window.location.href = data.url;
    });
  };


  const bill = () => {
    startTransition(async () => {
      const data = JSON.parse(await manageBillingPortal(user.stripe_customer_id));
      window.location.href = data.url;
    });
  };



  if (user.premium) {
    return (
      <div className="w-full sm:h-[15vh] lg:h-[20vh] h-[10vh] flex items-center justify-center flex-col gap-5">
        <h1>If you dont like our premium experience you can unsubscribe </h1>
        <Button
          onClick={bill}
          variant="link"
          className="w-1/2 h-1/2 flex items-center gap-4 border border-primary"
        >
          <h1 className={isPending ? "animate-spin" : "animate-bounce"}>
            <LightningBoltIcon />{" "}
          </h1>{" "}
          Unsubscribe
        </Button>
      </div>
    );
  } else {
    return (
      <div className="w-full sm:h-[15vh] lg:h-[20vh] h-[10vh] flex items-center justify-center flex-col gap-5">
        <h1>Buy premium to have unlimeted access on Ai querys</h1>
        <Button
          onClick={handleCheckOut}
          variant="link"
          className="w-1/2 h-1/2 flex items-center gap-4 border border-primary"
        >
          <h1 className={isPending ? "animate-spin" : "animate-bounce"}>
            <LightningBoltIcon />{" "}
          </h1>{" "}
          Upgrade to premium
        </Button>
      </div>
    );
  }
}

export default Settingsbtn;