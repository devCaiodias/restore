'use client'
import { useCallback, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import {useDropzone} from "react-dropzone"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


interface FilePreview {
    file: Blob;
    preview: string
}

export default function ImageUploadPlaceholder() {
    // pegando o estado da imagem
    const [file, setFile]  = useState<FilePreview | null>()
    // pegando o estado do processo da imagem
    const [fileToProcess, setFileToProcess] = useState<{path: string} | null>(null)
    // pegando o estado da imagem restaurada
    const [restoredFile, setRestoredFile] = useState<FilePreview | null>()
    
    // 
    const onDrop = useCallback(async (acceptFiles: File[]) => {
        try {
            // Capiturar file
            const file = acceptFiles[0]
            
            // Set Preview
            setFile({
                file, preview: URL.createObjectURL(file)
            })

            const supabase = createClientComponentClient()
            const {data, error} = await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER).upload(`${process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_FOLDER_PROCESSING}/${acceptFiles[0].name}`, acceptFiles[0])

            if (!error) {
                setFileToProcess(data)
            }
        } catch (error) {
            console.log("onDrop: ", error)
        }
    }, [])

    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(file.preview)
            if (restoredFile) URL.revokeObjectURL(restoredFile.preview)
            
        }
    }, [])

    const { isDragActive, getInputProps, getRootProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg"]
        }
    })


    // It just gets a boolean if the dialog is opening or closing
    async function handleDialoOpenChange(e: boolean) {
        console.log(e)
    }

    return (
        <div className="flex h-[200px] w-full shrink-0 items-center justify-center rounded-md border border-dashed">
            <div className="mx-auto flex max-w-[200px] flex-col items-center justify-center text-center">
                <h3 className="mt-4 text-lg font-semibold">
                    Just add a photos
                </h3>
                <p className="md-4 mt-2 text-sm text-muted-foreground">
                    The photo you add will be enhanced by AI.
                </p>
                <Dialog onOpenChange={handleDialoOpenChange}>
                    <DialogTrigger>
                        <Button size="sm" className="relative">
                            Add a photo
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Add a photo</DialogTitle>
                            <DialogDescription className="text-center">Drag a phone in order to Upload & Enhance</DialogDescription>
                        </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    {
                                        !file && (
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                {
                                                    isDragActive ? (
                                                        <p className="flex items-center justify-center bg-blue-200 opacity-55 border border-dashed border-blue-300 p-6 h-36 rounded-md">Drop your photo here...</p>
                                                    ) : (
                                                        <p className="flex items-center justify-center bg-blue-200 opacity-70 border border-dashed border-blue-300 p-6 h-36 rounded-b-md">Drag or click to cloose image</p>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    <div className="flex flex-col items-center justify-evenly sm:flex-row gap-2">
                                        {
                                            file && (
                                                <div className="flex flex-row flex-wrap drop-shadow-md">
                                                    <div className="flex w-48 h-48 relative">
                                                        <img className="w-48 h-48 rounded-md object-contain" src={file.preview} onLoad={() => {
                                                            URL.revokeObjectURL(file.preview)
                                                        }} />
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            restoredFile && (
                                                <div className="flex flex-row flex-wrap drop-shadow-md">
                                                    <div className="flex w-60 h-60 relative">
                                                        <img className="w-60 h-60 rounded-md object-contain" src={restoredFile.preview} onLoad={() => {
                                                            URL.revokeObjectURL(restoredFile.preview)
                                                        }} />
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter >
                                <Button>
                                    Import Phone
                                </Button>
                            </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}