'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface AvatarUploaderProps {
  userId: string
  url?: string | null
  onUploadComplete: (url: string) => void
}

export default function AvatarUploader({ userId, url, onUploadComplete }: AvatarUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setError(null)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('File size must be less than 2MB')
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('File must be an image (JPG, PNG, or GIF)')
      }

      console.log('Uploading avatar:', { fileName: file.name, fileSize: file.size, fileType: file.type })
      
      const fileExt = file.name.split('.').pop()
      // Use a better naming convention to avoid collisions
      const fileName = `${userId}/${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      console.log('Uploading to storage path:', filePath)

      // Upload the file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true, // Overwrite if exists
          contentType: file.type // Set the correct content type
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      console.log('Upload successful:', uploadData)

      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      
      const publicUrl = data.publicUrl
      console.log('Generated public URL:', publicUrl)
      
      // Update the user's profile with the new avatar URL
      console.log('Updating profile with new avatar URL')
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (updateError) {
        console.error('Profile update error:', updateError)
        throw new Error(`Failed to update profile: ${updateError.message}`)
      }

      console.log('Profile updated successfully')
      setAvatarUrl(publicUrl)
      onUploadComplete(publicUrl)
    } catch (error: any) {
      console.error('Avatar upload failed:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary bg-muted">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-2xl font-bold text-muted-foreground">
            {userId && userId.length > 1 ? userId.slice(0, 2).toUpperCase() : '?'}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label
          htmlFor="avatar"
          className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Change Avatar'}
          <input
            type="file"
            id="avatar"
            ref={fileInputRef}
            onChange={uploadAvatar}
            accept="image/jpeg,image/png,image/gif"
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="mt-1 text-xs text-muted-foreground">
          JPG, PNG or GIF. Max 2MB.
        </p>
        {error && (
          <p className="mt-2 text-sm p-2 bg-destructive/10 text-destructive rounded">
            {error}
          </p>
        )}
      </div>
    </div>
  )
} 