import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase/clientcomponent";

function UserAvatar() {
    const [avatar, setavatar] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: userData, error } = await supabase.auth.getUser();
            if (error) {
                return;
            } else {
                setavatar(userData?.user?.user_metadata?.avatar_url);
            }
        };
        getUser();
    }, []);

    return (
        <Avatar className="sm:block hidden" >
            <AvatarImage src={avatar ? avatar : "https://github.com/shadcn.png"} />
            <AvatarFallback>US</AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar;
