import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from './types'

export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies,
  })
} 