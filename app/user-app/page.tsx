import UserNav from "@/components/common/user-nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function UserApp() {
    // Vendo se o usuario está logado
    let loggedin = false;
    
    try {
        const supabase = createServerComponentClient({ cookies }); // ✅ forma correta
        const {data: {session}} = await supabase.auth.getSession()
    
        if (session) {
            loggedin = true
        }
        
    } catch (error) {
        console.log("UserApp ", error)
    }finally {
        if(!loggedin) {
            redirect("/", RedirectType.replace)
        }
    }

    return (
        <div>
            <h1><UserNav /></h1>

        </div>
    )
}