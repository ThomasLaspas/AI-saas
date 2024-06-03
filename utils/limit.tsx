"use server"
import { createSupabaseServerClient } from "@/supabase/serverclient";

interface User {
    id: string;
    created_at: string;
    email: string;
    free_tries: number;
    premium: boolean;
    stripe_customer_id: string
}

export const Checkfor5 = async () => {

    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()

    if (!data) {
        return false
    }

    let { data: users, error } = await supabase
        .from('users')
        .select('free_tries , premium')
        .eq('id', data.user?.id)
        .single()

    if (error) {
        console.log(error)
    }
    if (users?.premium) {
        return true
    }

    console.log(users)
    if (users && users.free_tries < 5) {
        return true
    } else {
        return false
    }


}

export const addtrie = async () => {
    const supabase = await createSupabaseServerClient()
    const { data: userData } = await supabase.auth.getUser();

    if (!userData) {
        return;
    }

    const userId = userData.user?.id;

    const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('free_tries')
        .eq('id', userId)
        .single();

    if (fetchError) {
        console.log(fetchError);
        return;
    }

    const newFreeTries = user.free_tries + 1;

    const { data, error } = await supabase
        .from('users')
        .update({ free_tries: newFreeTries })
        .eq('id', userId);

    if (error) {
        console.log(error);
    } else {
        console.log('free_tries updated successfully:', data);
    }


}

export const readprem = async (id: string | undefined): Promise<User | null> => {
    const supabase = await createSupabaseServerClient()

    const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('free_tries, premium,stripe_customer_id')
        .eq('id', id)
        .single();

    if (fetchError) {
        console.log(fetchError);
        return null;
    }
    return user as User

}

export const realtime = async () => {
    const supabase = await createSupabaseServerClient()

    const channels = supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'users' },
            (payload) => {
                console.log('Change received!', payload)
            }
        )
        .subscribe()
    return channels

}