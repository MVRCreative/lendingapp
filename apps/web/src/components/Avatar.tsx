import Image from 'next/image'

interface AvatarProps {
  url?: string | null
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
}

export default function Avatar({ url, name, size = 'md' }: AvatarProps) {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8'
      case 'lg':
        return 'h-12 w-12'
      case 'md':
      default:
        return 'h-10 w-10'
    }
  }

  const getInitials = () => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-muted ${getDimensions()}`}
    >
      {url ? (
        <Image
          src={url}
          alt={name || 'User avatar'}
          fill
          className="object-cover"
          sizes={size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px'}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-muted-foreground">
          {getInitials()}
        </div>
      )}
    </div>
  )
} 