import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Para verifica o usuario
export default async function Get(request: NextRequest) {
    const requestUrl = new URL(request.url)
    // pegando o code da url
    const code = requestUrl.searchParams.get("code")
    
    try {
        if(code) {
            const supabase = createRouteHandlerClient({cookies})
            // Validando o usuario com o code 
            await supabase.auth.exchangeCodeForSession(code)
        }
    } catch (error) {
        console.log("Auth_Callback ", error)
    }

    return NextResponse.redirect(requestUrl.origin)
}