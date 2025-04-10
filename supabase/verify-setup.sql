-- Verification queries for Supabase setup

-- Check if profiles table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'profiles'
) AS profiles_table_exists;

-- Check if avatars bucket exists
SELECT EXISTS (
   SELECT FROM storage.buckets 
   WHERE id = 'avatars'
) AS avatars_bucket_exists;

-- Check RLS policies for profiles
SELECT
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM
  pg_policies
WHERE
  tablename = 'profiles';

-- Check RLS policies for storage.objects
SELECT
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM
  pg_policies
WHERE
  tablename = 'objects' AND schemaname = 'storage';

-- Check if the trigger function exists
SELECT EXISTS (
   SELECT FROM pg_proc 
   WHERE proname = 'handle_new_user'
) AS trigger_function_exists;

-- Check if the trigger is set up correctly
SELECT 
  tgname AS trigger_name,
  proname AS function_name,
  tgenabled AS enabled
FROM pg_trigger
JOIN pg_proc ON pg_proc.oid = pg_trigger.tgfoid
WHERE tgname = 'on_auth_user_created';

-- Get count of existing profiles
SELECT COUNT(*) as profile_count FROM profiles;

-- Sample query to manually create a profile if needed
-- Uncomment and modify as needed
/*
INSERT INTO public.profiles (id, full_name, email, avatar_url, created_at, updated_at)
VALUES 
  (
    'REPLACE_WITH_USER_ID', -- Get this from auth.users table
    'Test User', 
    'test@example.com',
    NULL,
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;
*/ 