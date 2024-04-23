import { createClient } from "../utils/supabase/client";

export async function submitPin(data: any) {
    const supabase = createClient();
    const { error } = await supabase.from("pins").insert(data)

    if (error) {
        console.error(error)
    }
}