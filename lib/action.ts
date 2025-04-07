'use server';

import { writeFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path'

export type FromState = {
    error?: string;
    message?: string,
    success: boolean,
    file?: File,
}

export async function uploadFileAction(prevState: FromState, formData: FormData): Promise<FromState> {

    //const data = Object.fromEntries(formData.entries())
    //const file = data['file'] as File
    const file: File | null = formData.get('file') as unknown as File

    console.log(file)

    if (!file || !file.size) {
        return { success: false, error: 'not file', message: `file not selected` }
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const dir = join(process.cwd(), '/', process.env.STORAGE_DIR ?? '')
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
    }

    const path = join(dir, file.name)

    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)
    return {
        success: true, message: `upload complete success! name=${path} size=${file.size}`
    }
}