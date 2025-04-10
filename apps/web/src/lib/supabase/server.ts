import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './types'

export const createClient = () => {
  const cookieStore = cookies()
  
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  
  return supabase
} 