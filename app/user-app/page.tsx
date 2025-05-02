import UserNav from "@/components/common/user-nav";
import UserAppHeader from "@/components/user-app/user-app-header";
import UserAppSideBar from "@/components/user-app/user-app-sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { PlusCircleIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ImageUploadPlaceholder from "@/components/user-app/image-app-placeholder";

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
            <div className="md:block">
                <UserAppHeader />
                <div className="border-t">

                    <div className="bg-background">
                    
                        <div className="grid md:grid-cols-5">
                                <UserAppSideBar className="hidden md:block" />
                            <div className="col-span-3 lg:col-span-4 lg:border-1">

                                    <div className="h-full px-4 py-6 lg:px8">
                                        <Tabs defaultValue="music" className="h-full space-y-6">
                                            <div className="flex items-center">
                                                <TabsList>
                                                    <TabsTrigger value="photos" className="relative">
                                                        Photes
                                                    </TabsTrigger>
                                                    <TabsTrigger value="Documents">
                                                        Documents
                                                    </TabsTrigger>
                                                    <TabsTrigger value="Other" disabled>
                                                        Other
                                                    </TabsTrigger>
                                                </TabsList>
                                                <div className="ml-auto mr-4">
                                                    <Button>
                                                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                                                        Add Photos
                                                    </Button>
                                                </div>
                                            </div>
                                            <TabsContent value="photos" className="border-none p-0 outline-none">
                                                <div className="flex items-center">
                                                    <div className="space-y-1">
                                                        <h2 className="text-2xl font-semibold tracking-tight">Photos Colletion</h2>
                                                        <p>The photos you already enhanced.</p>
                                                    </div>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="relative">
                                                    <ImageUploadPlaceholder />
                                                </div>
                                                <div className="mt-6 space-y-1">
                                                    <h2 className="text-2xl font-semibold tracking-tight">Made for you</h2>
                                                    <p className="text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
                                                </div>

                                            </TabsContent>
                                            <TabsContent value="Documents" className="border-none p-0 outline-none">
                                                <div className="flex items-center">
                                                    <div className="space-y-1">
                                                        <h2 className="text-2xl font-semibold tracking-tight">Photos</h2>
                                                        <p>Top picks for you. Updated daily.</p>
                                                    </div>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="relative">
                                                    Lista
                                                </div>
                                                <div className="mt-6 space-y-1">
                                                    <h2 className="text-2xl font-semibold tracking-tight">Made for you</h2>
                                                    <p className="text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
                                                </div>

                                            </TabsContent>
                                            
                                        </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}