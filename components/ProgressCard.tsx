"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import React, { ChangeEvent, useTransition } from "react";
import { supabase } from "@/supabase/clientcomponent"
import { readprem } from "@/utils/limit"
import { loadStripe } from "@stripe/stripe-js";
import { checkout } from "@/utils/Sapi";
import { usePathname } from "next/navigation";
interface User {
    id: string;
    created_at: string;
    email: string;
    free_tries: number;
    premium: boolean;
}
function ProgressCard({ dt }: { dt: any }) {
    const pathname = usePathname();

    const [tries, setries] = useState<number>(0)
    const [value, setvalue] = useState<number>(0)
    const [premium, setpremium] = useState<boolean | undefined>(false)
    useEffect(() => {
        const data = async () => {

            const dat = await readprem(dt?.id)
            setpremium(dat?.premium)

            if (dat?.free_tries === 0) {
                return
            } else if (dat?.free_tries === 1) {
                setries(20)
                setvalue(1)
            }
            else if (dat?.free_tries === 2) {
                setries(40)
                setvalue(2)
            } else if (dat?.free_tries === 3) {
                setries(60)
                setvalue(3)
            } else if (dat?.free_tries === 4) {
                setries(80)
                setvalue(4)
            } else {
                setries(100)
                setvalue(5)
            }

        }
        data()
    }, [])

    useEffect(() => {
        const channels = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'users' },
                (payload) => {

                    const newUser = payload.new as User;
                    if (newUser.free_tries === 0) {
                        return
                    } else if (newUser.free_tries === 1) {
                        setries(20)
                        setvalue(1)
                    }
                    else if (newUser.free_tries === 2) {
                        setries(40)
                        setvalue(2)
                    } else if (newUser.free_tries === 3) {
                        setries(60)
                        setvalue(3)
                    } else if (newUser.free_tries === 4) {
                        setries(80)
                        setvalue(4)
                    } else {
                        setries(100)
                        setvalue(5)
                    }
                }
            )
            .subscribe()

        return () => {
            channels.unsubscribe();
        };
    }, [])
    const [isPending, startTransition] = useTransition();
    const handleCheckOut = () => {
        startTransition(async () => {
            const data = JSON.parse(
                await checkout(dt.email!, location.origin + pathname)
            );
            window.location.href = data.url;
        });
    };

    return (
        <>
            {premium ? <Card >
                <CardHeader>
                    <CardTitle className="text-center">You are premium user you have access in every AI tool as many times you want.</CardTitle>

                </CardHeader>


            </Card> : <Card >
                <CardHeader>
                    <CardTitle>{value}/5 free AI</CardTitle>

                </CardHeader>
                <CardContent>
                    <Progress value={tries} />
                </CardContent>
                <CardFooter>
                    {value === 5 ? <Button className="w-full" onClick={handleCheckOut}>
                        Upgrade
                    </Button> : null}

                </CardFooter>
            </Card>} </>
    )
}

export default ProgressCard