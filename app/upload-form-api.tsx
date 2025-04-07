'use client';

import { UploadFile } from "@/lib/definitions";
import React, { useState } from "react"


export const UploadFormApi = () => {

    const [files, setFiles] = useState<FileList | null>(null)
    const [message, setMessage] = useState('')
    //const inputRef = useRef<HTMLInputElement>(null)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e)

        if (!files) {
            setMessage('no file select')
            return
        }
        
        const data = new FormData()

        for (const file of files) {
            data.append('files', file)
        }

        setMessage('uploading...')
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: data
        })

        //setFiles(null)
        //e.currentTarget.reset()

        if (response.ok) {
            const uploadFile = await response.json() as UploadFile
            setMessage(`upload complete success! name=${uploadFile.path} size=${uploadFile.size}`)
           
            return
        }
        setMessage(await response.text())
        
        //if (inputRef && inputRef.current) inputRef.current.value = ''
    }

    return (
        <form onSubmit={submitHandler}>
            <label>File</label>
            <input name="file" type="file" onChange={(e) => setFiles(e.target.files)} />
            <button type="submit">Upload</button>
            <p>{message}</p>
        </form >
    )
}