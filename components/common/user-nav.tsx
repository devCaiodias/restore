import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import avatar from "../../public/imgs/avata.jpg"

export default function UserNav() {
    return (
        <DropdownMenu>
            
            {/* Imagem do usuario */}
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                        <AvatarImage src="../../public/imgs/avata.jpg" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            {/* Imformação do usuario */}
            <DropdownMenuContent className="w-56" align="end" forceMount >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Dev</p>
                        <p className="text-xs leading-none text-muted-foreground">dev@gmail.com</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Agrupando os links do profile */}
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profil
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        billing
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator /> 

                {/* Sair do usuario */}
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}