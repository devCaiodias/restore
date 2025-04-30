"use client"

import {User, createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import avatar from "../../public/imgs/avata.jpg"

export default function UserNav() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>()
    const supabase = createClientComponentClient()

    const getUser = async () => {
        const { error, data: {user}} = await supabase.auth.getUser()

        if(error) {
            console.log("UserNav: ", error)
        }else {
            setUser(user)
        }
    }
    
    useEffect(() => {
        getUser()
    })

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <>
            {
                user && (
                <DropdownMenu>
            
                {/* Imagem do usuario */}
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar>
                            <AvatarImage src="/avatars/avata.jpg"/>
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                {/* Imformação do usuario */}
                <DropdownMenuContent className="w-56" align="end" forceMount >
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.email?.split("@")[0]}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* Agrupando os links do profile */}
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profil
                            <DropdownMenuShortcut></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator /> 

                    {/* Sair do usuario */}
                    <DropdownMenuItem onClick={handleSignOut}>
                        Log out
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            )
            }
        </>
    )
}