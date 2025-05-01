import UserNav from "@/components/common/user-nav";
import UserAppHeader from "@/components/user-app-header";
import UserAppSideBar from "@/components/user-app/user-app-sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function UserApp() {
    // Vendo se o usuario está logado
    let loggedin = false;
    
    try {
        const supabase = createServerComponentClient({ cookies });
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
        <>
            <div className="hidden md:block">
                <UserAppHeader />
                <div className="border-t">

                    <div className="bg-background">
                    
                        <div className="grid lg:grid-cols-5">
                                <UserAppSideBar className="hidden md:block" />
                            <div className="col-span-3 lg:col-span-4 lg:border-1">

                                    <div className="h-full px-4 py-6 lg:px8">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}