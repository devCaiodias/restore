import { NextResponse, NextRequest } from "next/server";

interface NextRequestWithImage extends NextRequest{
    imageUrl: string
}

export async function POST(req: NextRequestWithImage, res: NextResponse) {

    console.log("POST received")
    
    const {imageUrl} = await req.json()
    
    console.log(imageUrl)
    
    return NextResponse.json({message: "Test"}, {status: 200})
}