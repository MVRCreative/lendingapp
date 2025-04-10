'use client'

import { useState, useCallback, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Upload, Camera, X } from 'lucide-react'

interface DropzoneAvatarProps {
  userId: string
  url?: string | null
  onUploadComplete: (url: string) => void
}

export default function DropzoneAvatar({ userId, url, onUploadComplete }: DropzoneAvatarProps) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url || null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (url) {
      setAvatarUrl(url)
    }
  }, [url])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      if (acceptedFiles.length === 0) return
      
      const file = acceptedFiles[0]
      setUploading(true)
      setError(null)

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('File size must be less than 2MB')
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('File must be an image (JPG, PNG, or GIF)')
      }
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        })

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const publicUrl = data.publicUrl
      
      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (updateError) {
        throw new Error(`Failed to update profile: ${updateError.message}`)
      }

      setAvatarUrl(publicUrl)
      onUploadComplete(publicUrl)
    } catch (error: any) {
      console.error('Avatar upload failed:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setUploading(false)
    }
  }, [userId, supabase, onUploadComplete])

  const removeAvatar = async () => {
    if (!avatarUrl) return
    
    try {
      setUploading(true)
      setError(null)
      
      // Update the user's profile to remove the avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (updateError) {
        throw new Error(`Failed to update profile: ${updateError.message}`)
      }

      setAvatarUrl(null)
      onUploadComplete('')
    } catch (error: any) {
      console.error('Avatar removal failed:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxFiles: 1,
    disabled: uploading
  })

  return (
    <div className="flex flex-col items-center space-y-4">
      {avatarUrl ? (
        <div className="relative">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary bg-muted">
            <Image
              src={avatarUrl}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <button 
            onClick={removeAvatar}
            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`
            flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 
            ${isDragActive 
              ? 'border-dashed border-primary bg-primary/10' 
              : 'border-dashed border-muted-foreground/40 bg-muted hover:bg-muted-foreground/5'
            }
            transition-colors duration-200 ease-in-out
          `}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          ) : (
            <>
              <Camera className="h-8 w-8 text-muted-foreground" />
              <span className="mt-1 text-[10px] text-muted-foreground">Upload</span>
            </>
          )}
        </div>
      )}
      
      {!avatarUrl && (
        <div className="text-center">
          <p className="mt-1 text-xs text-muted-foreground">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground">
            JPG, PNG or GIF. Max 2MB.
          </p>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm p-2 bg-destructive/10 text-destructive rounded">
          {error}
        </p>
      )}
    </div>
  )
} 