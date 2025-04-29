import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation"


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CreateAccontForm from "@/components/auth/create-accont-form";
import LoginAccontForm from "@/components/auth/login-account-form";


export default async function Home() {
  // Vendo se o usuario está logado
  let loggedin = false;
  
  try {
    const supabase = createServerComponentClient({cookies})
    const {data: {session}} = await supabase.auth.getSession()

    if (session) {
      loggedin = true
    }
    
  } catch (error) {
    console.log("Home ", error)
  }finally {
    if(loggedin) {
      redirect("/user-app", RedirectType.replace)
    }
  }
  
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Tabs defaultValue="create-account" className="w-[400px] border rounded-md pb-4 shadow-2xl">
      <TabsList className="grid w-full grid-cols-2 rounded-b-none h-14">
        <TabsTrigger value="create-account" className="transition-all delay-150">Account</TabsTrigger>
        <TabsTrigger value="login" className="transition-all delay-150">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="create-account">
          <CreateAccontForm />
      </TabsContent>
      <TabsContent value="login">
        <LoginAccontForm />
      </TabsContent>
    </Tabs>
    </div>
  );
}
