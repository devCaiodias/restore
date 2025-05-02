import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

export default function UserAppSideBar({className}: SideBarProps) {
    return ( 
        <>
            <div className={cn("pd-12", className)}>
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Discover
                        </h2>
                        <div className="space-y-1">
                            <Button variant="secondary" className="w-full justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="mr-2 h-4 w-4">
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                                </svg>
                                Browse
                            </Button>
                            <Button variant="secondary" className="w-full justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="mr-2 h-4 w-4">
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                                </svg>
                                Favorite
                            </Button>
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Library
                        </h2>
                        <div className="space-y-1">
                            <Button variant="secondary" className="w-full justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="mr-2 h-4 w-4">
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                                </svg>
                                Playlist
                            </Button>
                            <Button variant="secondary" className="w-full justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="mr-2 h-4 w-4">
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                                </svg>
                                Songs
                            </Button>
                            <Button variant="secondary" className="w-full justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="mr-2 h-4 w-4">
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                                </svg>
                                Made for you
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}