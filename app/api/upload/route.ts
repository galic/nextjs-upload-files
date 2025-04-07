import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { existsSync, mkdirSync } from 'node:fs'
import { UploadFile } from '@/lib/definitions'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('files') as unknown as File

  if (!file) {
    return NextResponse.json<UploadFile>({ state: false })
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

  return NextResponse.json<UploadFile>({ state: true, path: path, size: file.size })
}

