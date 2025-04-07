'use client';

import { FromState, uploadFileAction } from "@/lib/action"
import { useActionState } from "react"

const initialState: FromState = {
    success: false,
}

export const UploadFormAction = () => {

    const [state, action, isPending] = useActionState(uploadFileAction, initialState)
    console.log(state)
    return (
        <form action={action}>
            <label>File</label>
            <input name="file" type="file" />
            <button type="submit" disabled={isPending}>{isPending ? 'uploading...' : 'Upload'}</button>
            <p>{state.message}</p>
        </form >
    )
}