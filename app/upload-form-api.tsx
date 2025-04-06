'use client';

import React, { useState } from "react"

export const UploadFormApi = () => {

    const [files, setFiles] = useState<FileList | null>(null)
    const [message, setMessage] = useState('')

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e)

        if (!files) return
        const data = new FormData()
        
        for(const file of files){
            data.append('files', file)
        }
        

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: data
        })

        if (!response.ok) setMessage(await response.text())
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